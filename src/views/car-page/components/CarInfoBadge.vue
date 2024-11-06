<template>
  <div class="flex h-14 rounded-lg overflow-hidden border border-blue-light">
    <div
      class="h-full min-w-11 bg-blue-light text-creamy-light
      inline-flex justify-center items-center text-6"
    >
      <slot name="icon" />
    </div>
    <div class="body-1 text-creamy-light inline-flex whitespace-nowrap">
      <slot name="text" />
    </div>
  </div>
</template>
