<template>
  <header class="w-full h-24 flex justify-between items-center gap-2 px-25">
    <nav class="flex items-center h-full gap-12">
      <AppRouterLink :to="routeNames.home" :underlined="false">
        <Logo />
      </AppRouterLink>

      <ul class="flex gap-12 !text-blue body-1">
        <li v-for="(route, index) in navLinks" :key="index">
          <AppRouterLink :to="route.path">
            {{ route.label }}
          </AppRouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex gap-[50px] items-center">
      <ul class="flex gap-5 text-5 text-xl">
        <li v-for="(link, index) in iconLinks" :key="index">
          <AppRouterLink :to="link.path" :underlined="false">
            <IconButton :icon="link.icon as TIcons" :hover-icon="link.hoverIcon as TIcons" :count="link.count" />
          </AppRouterLink>
        </li>
      </ul>

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

const navLinks = [
  { path: routeNames.search, label: 'Купити' },
  { path: routeNames.create, label: 'Продати' },
  { path: routeNames.top, label: 'ТОП-100' },
  { path: routeNames.auction, label: 'Аукціон' }
]

const iconLinks = [
  { path: routeNames.favorites, icon: 'icon-heart', hoverIcon: 'icon-heart-fill' },
  { path: routeNames.chats, icon: 'icon-question-answer', hoverIcon: 'icon-question-answer-fill', count: 5 }
]

</script>
