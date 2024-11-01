<template>
  <SectionLayout class="mb-12.5">
    <h2>Шукайте улюблені бренди</h2>
    <div class="flex gap-9 mx-auto">
      <AppButton
        v-for="brand in brands"
        :key="brand.id"
        class="h-fit w-1/5 shadow hover:scale-110"
        type="icon"
        @click="router.push({
          name: $routeNames.search,
          query: searchService.convertToLocationQueryRaw({brand: brand.id}
          )})"
      >
        <div class="flex flex-col items-center gap-4 p-10 max-w-[220px]">
          <el-image :src="brand.brand_logo || ''" :alt="brand.brand" class="h-14" />
          <h4 class="h4 text-gray-dark">{{ brand.brand }}</h4>
          <p class="body-2 text-gray-dark">
            {{ brand.cars_count }} в наявності
          </p>
        </div>
      </AppButton>
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import searchService from '@/services/search-service/search.service'
import SectionLayout from '@/layouts/SectionLayout.vue'

import { router } from '@/router'

defineProps<{
  brands: TTables<'brands'>[]
}>()

</script>
