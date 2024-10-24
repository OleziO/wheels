<template>
  <header class="w-full h-24 flex justify-between items-center gap-4 bg-creamy-light px-100">
    <nav class="flex items-center h-full gap-12">
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <ul class="flex gap-12">
        <li><el-link>Купити</el-link></li>
        <li><el-link>Продати</el-link></li>
        <li><el-link>Фінанси</el-link></li>
        <li><el-link>ТОП-100</el-link></li>
        <li><el-link>Аукціон</el-link></li>
      </ul>
    </nav>
    <div class="flex gap-[50px] items-center">
      <div class="flex gap-5 text-5 text-xl">
        <IconButton icon="icon-heart" hover-icon="icon-heart-fill" />
        <IconButton icon="icon-question-answer" hover-icon="icon-question-answer-fill" :count="5" />
        <IconButton icon="icon-notification-3" hover-icon="icon-notification-3-fill" :count="3" />
      </div>
      <AppButton type="line-light" class="!rounded-[50px] h-10 body-1" icon="icon-user-3">Особистий кабінет</AppButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/Logo.vue'
import { RouterLink } from 'vue-router'
</script>
