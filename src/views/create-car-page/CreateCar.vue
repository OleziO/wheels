<template>
  <div class="w-full">
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
        <h2 class="h2">{{ isPublished ? 'Успішна публікація' : 'Створити оголошення' }}</h2>
      </div>

      <CreateCarForm
        v-if="!loading"
        v-model:loading="loading"
        v-model:isPublished="isPublished"
      />

      <CreateCarSuccess v-else :create-loading="loading" :published="isPublished" />
    </div>
  </div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore()

const loading = ref(false)
const isPublished = ref(false)

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

onMounted(async () => {
  await searchStore.getSearchFilterOptions()
})

</script>
