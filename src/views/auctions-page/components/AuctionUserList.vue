<template>
  <div class="w-[400px] h-full overflow-y-scroll bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col gap-6">
    <div
      v-for="user in activeUsers"
      :key="user.id"
      class="flex gap-2 items-center"
    >
      <el-avatar class="w-10 h-10 rounded-full overflow-hidden" :src="user.avatar || ''">
        <div class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
          <i class="icon-user-3 h3" />
        </div>
      </el-avatar>

      <p>
        {{ user.first_name }} {{ user.last_name }}
      </p>
    </div>

    <div
      v-if="!activeUsers.length"
      class="w-full h-full flex justify-center items-center"
    >
      <p class="body-1 text-gray-dark">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps<{
  activeUsers: any
  name: string
}>()
</script>
