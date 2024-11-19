<template>
  <div v-loading.fullscreen="loading" class="w-full max-w-[1440px] px-25 py-12.5 mx-auto">
    <h2 class="h2 text-gray-dark mb-12.5">Особистий кабінет</h2>

    <div class="flex gap-12">
      <aside class="w-[370px] sticky top-10 h-fit">
        <div
          class="flex items-center gap-4 whitespace-nowrap body-2 text-gray-dark
         bg-creamy py-2.5 px-4 pr-16 rounded-xl"
        >
          <el-avatar class="w-25 h-25 rounded-full overflow-hidden" :src="authStore.user?.avatar || ''">
            <div class="w-25 h-25 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
              <i class="icon-user-3 h3" />
            </div>
          </el-avatar>

          <div class="h-full flex-1 secondary text-gravel flex flex-col gap-2.5 truncate">
            <h4 class="h4 text-gray-dark truncate">
              {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
            </h4>

            <p class="truncate">ID {{ authStore.user?.sub }}</p>
            <p> {{ authStore.user?.phone }}</p>
          </div>
        </div>

        <AppButton class="w-full mt-7 mb-12.5" icon="icon-add" @click="router.push({name: $routeNames.createCar})">
          Додати оголошення
        </AppButton>

        <div class="flex flex-col items-start gap-7">
          <div
            v-for="menuItem in profilesMenuItems"
            :key="menuItem.title"
            class="flex gap-6 items-center cursor-pointer text-blue-light text-2xl tracking-[6%] group"
            @click="handleSectionChange(menuItem)"
          >
            <i :class="menuItem.icon" />
            <p
              class="h4 text-gray-dark
              group-hover:underline group-hover:text-blue-light underline-offset-8"
            >
              {{ menuItem.title }}
            </p>
          </div>
        </div>
      </aside>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from '@/router'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)

const profilesMenuItems: IProfilePageSections[] = [
  {
    title: 'Особиста інформація',
    icon: 'icon-user-3',
    route: routeNames.profileInfo

  },
  {
    title: 'Мої оголошення',
    icon: 'icon-passport',
    route: routeNames.myCars
  },
  {
    title: 'Активні чати',
    icon: 'icon-question-answer',
    route: routeNames.chats
  },
  {
    title: 'Історія переглядів',
    icon: 'icon-history',
    route: routeNames.viewsHistory
  },
  {
    title: 'Вийти з профілю',
    icon: 'icon-logout-box',
    action: async () => {
      await authStore.logout()

      window.location.href = '/'
    }
  }
]

async function handleSectionChange (menuItem: IProfilePageSections) {
  if (menuItem.action) menuItem.action()
  else router.push({ name: menuItem.route })
}

</script>
