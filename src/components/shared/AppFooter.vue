<template>
  <footer
    class="flex justify-between items-center gap-2 px-25 py-4
    border-t border-t-creamy-dark"
  >
    <div>
      <Logo />
      <p class="mt-2.5 secondary text-gravel">© {{ currYear }} Wheels.com. Всі права захищені.</p>
    </div>
    <nav>
      <ul class="flex gap-14 text-black body-2">
        <li v-for="link in footerLinks" :key="link.path">
          <AppRouterLink :to="link.path">
            {{ link.title }}
          </AppRouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/Logo.vue'
import { routeNames } from '@/router/route-names'

const currYear = ref(new Date().getFullYear())

const footerLinks = [
  {
    title: 'Угода про надання послуг',
    path: routeNames.home
  },
  {
    title: 'Політика приватності',
    path: routeNames.home
  },
  {
    title: 'Карта сайту',
    path: routeNames.home
  },
  {
    title: 'Зв’яжіться з нами',
    path: routeNames.home
  }
]
</script>
