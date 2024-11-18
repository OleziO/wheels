<template>
  <div v-loading.fullscreen="formLoading" class="w-full">
    <div v-if="!loading" class="w-full max-w-[1440px] mx-auto px-25">
      <h2 class="h2 mt-12.5 mb-10">Як швидко продати свій автомобіль</h2>

      <div class="w-full flex justify-between gap-5">
        <CreateCarPageInfoCard
          v-for="(info) in carInfoCards"
          :key="info.icon"
          :title="info.title"
          :text="info.text"
          :icon="(info.icon as TIcons)"
        />
      </div>
    </div>

    <div class="mt-12.5">
      <div class="w-fit bg-creamy ml-25 rounded-tl-25 rounded-tr-25 py-8 px-32">
        <h2 class="h2">Створити оголошення</h2>
      </div>

      <CreateCarForm
        v-model:loading="loading"
        v-model:is-published="isPublished"
        v-model:car-id="carId"
      />

      <el-dialog
        v-model="loading"
        align-center
        :show-close="false"
        :before-close="() => loading"
        lock-scroll class="w-[80%] h-[80%] p-0 z-50 bg-creamy rounded-lg overflow-hidden"
      >
        <CreateCarSuccess v-model="isPublished" :create-loading="loading" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from '@/router'

const router = useRouter()
const searchStore = useSearchStore()

const loading = ref(false)

const formLoading = ref(false)

const isPublished = ref<IPublishStatus>({
  isReqEnd: false,
  isProgressEnd: false
})

const carId = ref('')

const carInfoCards = [
  {
    icon: 'icon-camera',
    title: 'Робіть якісні фотографії',
    text: 'Це може здатися очевидним, але якісні фотографії можуть значно вплинути на час, необхідний для продажу вашого автомобіля. Оголошення з хорошими фотографіями продаються втричі швидше.'
  },
  {
    icon: 'icon-filter',
    title: 'Дотримуйтесь простоти',
    text: 'Опис транспортного засобу повинен бути коротким і простим. Вказуйте додаткові опції, яких можуть не мати інші подібні автомобілі. Це пришвидшить ваш продаж в рази.'
  },
  {
    icon: 'icon-guard',
    title: 'Будьте чесними',
    text: 'Важливо, щоб опис автомобіля був точним. Якщо на вашому автомобілі є невелика подряпина - будьте чесними. Це заощадить час на непотрібні огляди, якщо покупці знають про будь-які недоліки з самого початку.'
  }
]

watch(() => isPublished.value, () => {
  if (
    isPublished.value.isProgressEnd &&
    isPublished.value.isReqEnd &&
    carId.value
  ) {
    router.push({ name: routeNames.cars, params: { id: carId.value } })
  } else if (
    isPublished.value.isProgressEnd &&
    !isPublished.value.isReqEnd
  ) {
    loading.value = false
  }
}, {
  deep: true
})

onMounted(async () => {
  formLoading.value = true

  await searchStore.getSearchFilterOptions()

  formLoading.value = false
})

</script>
