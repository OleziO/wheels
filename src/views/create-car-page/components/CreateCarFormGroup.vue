<template>
  <div class="w-full border-b border-b-creamy-dark pb-12.5">
    <div class="flex gap-7 items-center">
      <div class="bg-orange w-10 h-10 flex justify-center items-center rounded-full text-creamy-light">
        {{ sectionNumber }}
      </div>
      <h4 class="h4">{{ title }}</h4>
    </div>

    <div class="flex flex-col gap-5 mt-12.5 px-25">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  sectionNumber: number
}>()
</script>
