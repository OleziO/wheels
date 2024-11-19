<template>
  <div class="w-full">
    <div
      class="h3 text-gray-dark mb-6 flex gap-1.5 items-center cursor-pointer"
      @click="router.replace({name: routeNames.chats })"
    >
      <i class="icon-arrow-left-s" />

      <h3>Активні чати</h3>
    </div>

    <div class="w-full">
      <div class="h-20 flex-1 bg-creamy flex p-5 rounded-lg">
        <div class="flex gap-4 items-center h-full">
          <el-avatar class="w-14 h-14 rounded-full overflow-hidden" :src="otherUserData?.avatar || ''">
            <div class="w-14 h-14 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
              <i class="icon-user-3 h3" />
            </div>
          </el-avatar>

          <h4 class="h4 text-gray-dark">
            {{ otherUserData?.first_name }}
          </h4>
        </div>
      </div>

      <div ref="chatRef" class="h-[50vh] p-5 flex flex-col gap-6 overflow-y-scroll ">
        <ChatMessage
          v-for="message in messages"
          :key="message.messageText"
          :chat-message="message"
        />
      </div>

      <el-form class="flex-1 h-25 bg-creamy flex p-5 gap-4 border-t border-b border-creamy-dark">
        <AppInput v-model="newMessage" placeholder="Введіть повідомлення" />

        <AppButton
          native-type="submit"
          type="secondary"
          icon="icon-arrow-right"
          class="!h-14"
          @click.prevent="sendMessage"
        />
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { routeNames } from '@/router'
import ChatMessage from '@/views/chat-page/components/ChatMessage.vue'
import type { RealtimeChannel } from '@supabase/supabase-js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const chatRef = useTemplateRef('chatRef')
const messages = ref<IChatMessage[]>()
const realtimeChanel = ref<RealtimeChannel>()
const newMessage = ref('')

const otherUserData = ref<TTables<'user_profiles'> | null>(null)

async function scrollChatToBottom () {
  await nextTick()

  nextTick(() => {
    chatRef.value?.scrollTo({
      top: chatRef.value?.scrollHeight,
      behavior: 'smooth'
    })
  })
}

async function sendMessage () {
  if (newMessage.value) {
    await chatService.sendMessage(route.params.id as string, authStore.user?.sub, newMessage.value)
    newMessage.value = ''

    scrollChatToBottom()
  }
}

async function updateMessages (newMessage: TTables<'chat_messages'>) {
  messages.value?.push(
    {
      isMyMessage: newMessage.user_id === authStore.user?.sub,
      messageText: newMessage.message_text,
      messageTime: newMessage.sent_at
    } as IChatMessage)

  otherUserData.value && await chatService.readMessages(route.params?.id as string, otherUserData.value.id)
  scrollChatToBottom()
}

onMounted(async () => {
  realtimeChanel.value = chatService.createChatChanel(route.params.id as string, updateMessages)

  messages.value = (await chatService.getMessages(route.params.id as string)).map(message => {
    return {
      isMyMessage: authStore.user?.sub === message.user_id,
      messageText: message.message_text,
      messageTime: message.sent_at
    }
  }) as IChatMessage[]

  otherUserData.value = await chatService.getOtherChatUserData(authStore.user?.sub, route.params?.id as string)
  otherUserData.value && await chatService.readMessages(route.params?.id as string, otherUserData.value.id)

  scrollChatToBottom()
})

</script>
