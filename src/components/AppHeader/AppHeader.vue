<template>
  <header class="w-full h-24 flex justify-between items-center gap-2 px-25">
    <nav class="flex items-center h-full gap-12">
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <ul class="flex gap-12 !text-blue body-1">
        <li>
          <AppRouterLink :to="routeNames.search">
            Купити
          </AppRouterLink>
        </li>
        <li>
          <AppRouterLink :to="routeNames.create">
            Продати
          </AppRouterLink>
        </li>
        <li>
          <AppRouterLink :to="routeNames.finances">
            Фінанси
          </AppRouterLink>
        </li>
        <li>
          <AppRouterLink :to="routeNames.top">
            ТОП-100
          </AppRouterLink>
        </li>
        <li>
          <AppRouterLink :to="routeNames.auction">
            Аукціон
          </AppRouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex gap-[50px] items-center">
      <div class="flex gap-5 text-5 text-xl">
        <AppRouterLink :to="routeNames.favorites" :underlined="false">
          <IconButton icon="icon-heart" hover-icon="icon-heart-fill" />
        </AppRouterLink>
        <AppRouterLink :to="routeNames.chats" :underlined="false">
          <IconButton
            icon="icon-question-answer"
            hover-icon="icon-question-answer-fill"
            :count="5"
          />
        </AppRouterLink>
        <IconButton
          icon="icon-notification-3"
          hover-icon="icon-notification-3-fill"
          :count="3"
        />
      </div>
      <AppRouterLink :to="routeNames.profile" :underlined="false">
        <AppButton type="line-light" class="!rounded-[50px] h-10 body-1" icon="icon-user-3">
          Особистий кабінет
        </AppButton>
      </AppRouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/Logo.vue'
import { routeNames } from '@/router/route-names'
import { RouterLink } from 'vue-router'
</script>
