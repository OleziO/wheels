class ChatService {
  createChatChanel (
    chatId: string,
    onAdd: (newMessage: TTables<'chat_messages'>) => void
  ) {
    const channel = supabase.channel(`chat_channel_${chatId}`)

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        async (payload) => {
          const newMessage = payload.new as TTables<'chat_messages'>

          try {
            if (newMessage.chat_id === chatId) {
              onAdd(newMessage)
            }
          } catch (err) {
            console.error('Error processing new message:', err)
            throw err
          }
        }
      )
      .subscribe()

    return channel
  }

  async getMyChats (userId: string) {
    try {
      const { data } = await supabase
        .from('user_chats')
        .select(`
        *,
        user_profiles_from_user:from_user_id!inner(*),
        user_profiles_to_user:to_user_id!inner(*)
      `)
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)

      if (!data) return []

      const chatsWithMessages = await Promise.all(
        data.map(async (chat: any) => {
          const isFromUser = chat.from_user_id === userId

          const otherUser = (isFromUser ? chat.user_profiles_to_user : chat.user_profiles_from_user) as TTables<'user_profiles'>

          const { data: lastMessageData, error } = await supabase
            .from('chat_messages')
            .select('message_text')
            .in('user_id', [chat.from_user_id, chat.to_user_id])
            .eq('chat_id', chat.id)
            .order('sent_at', { ascending: false })
            .limit(1)
            .single()

          const { count: unread } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact' })
            .eq('chat_id', chat.id)
            .eq('user_id', otherUser.id)
            .eq('is_read', false)

          return {
            ...chat,
            id: chat.id,
            unread: unread || 0,
            other_user: otherUser,
            last_message: error ? '' : lastMessageData!.message_text
          }
        })
      )

      return chatsWithMessages
    } catch {
      return []
    }
  }

  async getMessages (chatId: string) {
    const { data } = await supabase
      .from('chat_messages')
      .select()
      .eq('chat_id', chatId)
      .order('sent_at', { ascending: true })

    return data || []
  }

  async readMessages (chatId: string, otherUserId: string) {
    const { data } = await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('chat_id', chatId)
      .eq('user_id', otherUserId)
      .select()

    return data
  }

  async getOtherChatUserData (userId: string, chatId: string) {
    const { data } = await supabase
      .from('user_chats')
      .select()
      .eq('id', chatId)
      .single()

    if (!data) return null

    const otherUserId = userId === data.from_user_id ? data.to_user_id : data.from_user_id

    const { data: otherUserData } = await supabase.from('user_profiles').select().eq('id', otherUserId).single()

    return otherUserData || null
  }

  async sendMessage (chatId: string, myId: string, newMessage: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: myId,
        chat_id: chatId,
        message_text: newMessage,
        is_read: false
      })

    if (error) throw error

    return data
  }

  async getChatId (userId: string, myId: string) {
    const { data } = await supabase
      .from('user_chats')
      .select('id, from_user_id, to_user_id')

    const userChatId = data?.find(chat =>
      (chat.from_user_id === userId && chat.to_user_id === myId) ||
      (chat.from_user_id === myId && chat.to_user_id === userId)
    )

    if (!userChatId?.id) {
      const { data: newChatId } = await supabase
        .from('user_chats')
        .insert({
          from_user_id: myId,
          to_user_id: userId
        })
        .select('id')
        .single()

      return newChatId?.id
    }

    return userChatId?.id
  }

  async getAllUreadMessages (userId: string) {
    const { data: chats } = await supabase
      .from('user_chats')
      .select('*')
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)

    const chatsIdList = chats?.map(chat => chat.id) || []

    const { count: unread } = await supabase
      .from('chat_messages')
      .select('*', { count: 'exact' })
      .in('chat_id', chatsIdList)
      .neq('user_id', userId)
      .eq('is_read', false)

    return unread || 0
  }
}

export const chatService = new ChatService()
