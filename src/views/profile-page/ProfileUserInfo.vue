<template>
  <div v-loading.fullscreen="loading" class="flex-1">
    <h3 class="h3 text-gray-dark mb-10">Особиста інформація</h3>

    <div class="flex flex-col gap-12.5">
      <div
        class="flex items-center gap-4 whitespace-nowrap body-2 text-gray-dark
        pb-12.5 border-b border-creamy-dark"
      >
        <div class="relative w-[200px] h-[200px] overflow-hidden rounded-full">
          <el-avatar
            class="w-[200px] h-[200px] rounded-full overflow-hidden"
            :src="userAvatar || ''"
          >
            <div
              class="w-[200px] h-[200px] rounded-full
            flex justify-center items-center bg-gray-light text-creamy-light"
            >
              <i class="icon-user-3 h3" />
            </div>
          </el-avatar>

          <div
            class="absolute bottom-0  flex justify-center items-end cursor-pointer
          text-creamy-light w-full h-full group"
            @click="showUserChangeAvatarDialog = true"
          >
            <p class="secondary w-full flex justify-center items-center h-14 bg-blue group-hover:bg-blue-light">
              Змінити
            </p>
          </div>
        </div>

        <div class="h-full flex-1 secondary text-gravel flex flex-col gap-5 truncate">
          <h4 class="h4 text-gray-dark truncate">
            {{ detailedUserData?.first_name }} {{ detailedUserData?.last_name }}
          </h4>

          <p class="truncate text-gravel">Ваш клієнтський номер: {{ detailedUserData?.sub }}</p>

          <div class="body-2 flex flex-col gap-5 text-gray-dark">
            <p> Ваш телефон: {{ detailedUserData?.phone }}</p>
            <p> Ваш email: {{ detailedUserData?.email }}</p>
          </div>
        </div>
      </div>

      <el-form v-if="detailedUserData" class="titled-form">
        <el-form-item prop="firstName" label="Ім'я">
          <AppInput v-model:="detailedUserData.first_name" placeholder="Введіть ваше ім'я" />
        </el-form-item>

        <el-form-item prop="lastName" label="Прізвище">
          <AppInput v-model:="detailedUserData.last_name" placeholder="Введіть ваше прізвище" />
        </el-form-item>

        <el-form-item prop="email" label="Email">
          <AppInput
            v-model:="detailedUserData.email"
            type="email"
            placeholder="Введіть ваш Email"
          />
        </el-form-item>

        <el-form-item prop="phone" label="Телефон">
          <AppInput
            v-maska="'+38 (###) ###-##-##'"
            v-model:="detailedUserData.phone"
            placeholder="Введіть ваш номер телефону"
          />
        </el-form-item>

        <div class="grid grid-cols-[300px_500px] mt-12.5">
          <AppButton class="w-[500px] col-start-2" type="secondary" @click="handleUpdateUserData">
            Зберегти зміни
          </AppButton>
        </div>
      </el-form>
    </div>
    <ProfileChangePictureDialog
      v-model="showUserChangeAvatarDialog"
      v-model:user-avatar="userAvatar"
    />
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
import type { IUser } from '@/views/auth/auth.store'

const props = defineProps<{
  token: string
  email: string
}>()

const authStore = useAuthStore()

const loading = ref(false)
const detailedUserData = ref<IUser>()

const showUserChangeAvatarDialog = ref(false)
const userAvatar = ref(authStore.user?.avatar || '')

async function handleUpdateUserData () {
  loading.value = true

  await profileService.updateUserInfo({ ...detailedUserData.value, avatar: userAvatar.value } as IUser)

  if (authStore.user?.email !== detailedUserData.value?.email) {
    ElMessage({
      type: 'info',
      message: 'На ваш новий Email надіслано лист для підтвердження зміни'
    })
  }

  const userMainData = await authService.getSession()
  authStore.user = { avatar: userMainData.avatar, ...userMainData.session?.user.user_metadata }

  detailedUserData.value = cloneDeep(authStore.user)

  loading.value = false
}

onMounted(async () => {
  loading.value = true

  detailedUserData.value = cloneDeep(authStore.user)

  if (props.token && props.email && authStore.user) {
    await profileService.verifyEmail(authStore.user, props.token, props.email)

    ElMessage({
      type: 'success',
      message: 'Email успішно оновлено'
    })
  }

  loading.value = false
})
</script>
