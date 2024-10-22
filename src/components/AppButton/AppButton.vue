<template>
  <el-button
    class="flex items-center justify-center gap-2.5 rounded-lg text-creamy-light border-none h-fit text-lg"
    :text="type === 'text'"
    :class="type"
  >
    <template v-if="!!icon" #icon>
      <i :class="icon" />
    </template>

    <slot />
  </el-button>
</template>

<script setup lang="ts">
defineProps<{
  type: TButtonTypes
  icon?: TIcons
}>()
</script>

<style scopped lang="scss">
.el-button {
  &.primary {
    @apply bg-orange hover:bg-orange-light focus:bg-orange-dark;
  }

  &.secondary {
    @apply bg-blue hover:bg-blue-extra-light focus:bg-blue-dark;
  }

  &.line-light {
    @apply text-blue-light border-solid border-blue-light bg-transparent
    hover:bg-blue-extra-light hover:text-creamy-light
    focus:bg-blue focus:text-creamy-light;
  }

  &.line-dark {
    @apply text-blue-light border-solid border-blue-light bg-transparent
    hover:bg-blue-light hover:text-creamy-light
    focus:bg-blue-dark focus:text-creamy-light;
  }

  &.text{
    @apply text-blue-light p-0 rounded-none;

    &:hover {
      @apply bg-transparent #{!important};

      span {
      @apply underline;
    }
    }

  }
}

</style>
