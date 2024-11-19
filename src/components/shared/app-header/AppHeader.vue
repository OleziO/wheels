<template>
  <header class="w-full h-16 flex justify-between items-center gap-2 px-25 bg-creamy-light z-40">
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
      <ul v-if="authStore.user" class="flex gap-5 text-5 text-xl">
        <li v-for="(link, index) in iconLinks" :key="index">
          <AppRouterLink :to="link.path" :underlined="false">
            <el-badge :value="link.count" :max="99" :hidden="!link.count">
              <el-tooltip
                content="Чати"
                placement="bottom"
              >
                <IconButton :icon="(link.icon as TIcons)" :hover-icon="(link.hoverIcon as TIcons)" />
              </el-tooltip>
            </el-badge>
          </AppRouterLink>
        </li>
      </ul>

      <AppButton
        v-if="!authStore.user"
        type="line-light"
        class="!rounded-[50px] h-10 body-1"
        icon="icon-user-3"
        @click="authStore.showAuthModal = true"
      >
        Особистий кабінет
      </AppButton>

      <el-dropdown v-else placement="bottom">
        <AppButton
          type="line-light"
          class="!rounded-[50px] h-10 body-1"
          icon="icon-user-3"
        >
          {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
        </AppButton>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <AppButton
                class="menuBtutton w-full hover:!bg-transparent"
                type="text"
                text
                icon="icon-user-3"
                @click="router.push({ name: routeNames.profileInfo })"
              >
                Особистий кабінет
              </AppButton>
            </el-dropdown-item>
            <el-dropdown-item>
              <AppButton
                class="menuBtutton w-full !justify-start hover:!bg-transparent"
                type="text"
                text
                icon="icon-arrow-left"
                @click="handleLogout"
              >
                Вийти
              </AppButton>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>

  <AuthModal v-model="authStore.showAuthModal" />
</template>

<script setup lang="ts">
import Logo from '@/assets/images/Logo.vue'
import { routeNames } from '@/router/route-names'
import AuthModal from '@/views/auth/AuthModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const generalStore = useGeneralStore()

const navLinks = [
  { path: routeNames.search, label: 'Купити' },
  { path: routeNames.createCar, label: 'Продати' },
  { path: routeNames.top, label: 'ТОП-30' },
  { path: routeNames.auctionsList, label: 'Аукціони' }
]

const iconLinks = computed(() => [
  { path: routeNames.chats, icon: 'icon-question-answer', hoverIcon: 'icon-question-answer-fill', count: generalStore.unreadMessagesCount }
])

async function handleLogout () {
  await authStore.logout()
  window.location.href = '/'
}

</script>
