interface IChat {
  lastMessage: string
  time: string
  avatar: string
  name: string
  id: string
  unread: number
}

interface IChatMessage {
  isMyMessage: boolean
  messageText: string
  messageTime: string
}
