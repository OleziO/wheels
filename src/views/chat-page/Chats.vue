<template>
  <div v-loading.fullscreen="loading" class="w-full">
    <h3 class="h3 text-gray-dark mb-10">Активні чати</h3>

    <div v-if="chats" class="w-full">
      <ChatListItem
        v-for="chat in chats"
        :key="chat.name"
        :chat-data="chat"
        @click="router.push({name: $routeNames.chatPage, params: {id: chat.id}})"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatListItem from '@/views/chat-page/components/ChatListItem.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const chats = ref<IChat[]>([])

onMounted(async () => {
  loading.value = true

  chats.value = (await chatService.getMyChats(authStore.user?.sub)).map(chat => {
    return {
      id: chat.id,
      lastMessage: chat.last_message,
      avatar: chat.other_user.avatar,
      name: chat.other_user.first_name,
      time: '',
      unread: chat.unread
    }
  })

  loading.value = false
})

</script>
