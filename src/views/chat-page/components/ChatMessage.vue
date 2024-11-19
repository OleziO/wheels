<template>
  <div
    class="w-fit flex flex-col"
    :class="{'self-end': chatMessage.isMyMessage}"
  >
    <div
      class="body-2 text-creamy-light w-[350px] rounded-25 rounded-br-none
  bg-orange py-5 px-7 flex items-center"
      :class="{'!bg-creamy-dark text-gray-dark !rounded-br-25 rounded-bl-none': !chatMessage.isMyMessage}"
    >
      <p>{{ chatMessage.messageText }}</p>
    </div>

    <div
      class="self-end mt-2.5 text-gray-light"
      :class="{'!self-start': !chatMessage.isMyMessage}"
    >
      <p>
        {{ time }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  chatMessage: IChatMessage
}>()

const time = computed(() => dayjs(props.chatMessage.messageTime).format('HH:mm'))

</script>
