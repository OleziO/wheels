<template>
  <div
    class="border-t border-b border-creamy-dark py-2.5 px-5 w-full
    cursor-pointer hover:bg-creamy transition-all duration-500"
  >
    <div class="w-full flex items-center gap-4">
      <el-avatar class="min-w-20 max-w-20 h-20 rounded-full overflow-hidden" :src="chatData.avatar || ''">
        <div
          class="min-w-20 max-w-20 h-20
          rounded-full flex justify-center items-center bg-gray-light text-creamy-light"
        >
          <i class="icon-user-3 h3" />
        </div>
      </el-avatar>

      <div class="flex w-full h-full justify-between items-center">
        <div class="h-full flex flex-col justify-center gap-1">
          <h4 class="button-text text-gray-dark">
            {{ chatData.name }}
          </h4>

          <p class="gravel text-gravel">
            {{ chatData.lastMessage }}
          </p>
        </div>

        <div
          v-if="chatData.unread"
          class="h-10 w-10 body-2 flex justify-center items-center rounded-full bg-orange text-creamy-light"
        >
          {{ chatData.unread }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  chatData: IChat
}>()

</script>
