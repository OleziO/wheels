<template>
  <div class="w-full">
    <div v-if="!loading" class="w-full max-w-[1440px] mx-auto px-25">
      <h2 class="h2 mt-12.5 mb-10">Як швидко продати свій автомобіль</h2>
      <div class="w-full flex justify-between gap-5">
        <CreateInfoCard
          v-for="(info) in createService.infoCards"
          :key="info.icon"
          :title="info.title"
          :text="info.text"
          :icon="(info.icon as TIcons)"
        />
      </div>
    </div>

    <CreateForm v-model="loading" class="mt-12.5" />
    <AppScrollTopButton />
  </div>
</template>

<script setup lang="ts">
import createService from '@/views/create-page/create.service'

const selectCarData = useSearchStore()
const loading = ref(false)

onMounted(async () => {
  await selectCarData.getSearchFilterOptions()
})

</script>
