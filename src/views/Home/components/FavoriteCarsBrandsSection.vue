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
          name: routeNames.search,
          query: SearchFilters.convertToLocationQueryRaw({brand: brand.id}
          )})"
      >
        <div class="flex flex-col items-center gap-4 p-10">
          <el-image :src="brand.picture" :alt="brand.name" class="h-14" />
          <h4 class="h4 text-gray-dark">{{ brand.name }}</h4>
          <p class="body-2 text-gray-dark">
            {{ brand.count }} в наявності
          </p>
        </div>
      </AppButton>
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'
import SearchFilters from '@/services/search-service/search.service'
import { router } from '@/router'
import { routeNames } from '@/router/route-names'

interface IBrandItem {
  id: string
  name: string
  picture: string
  count: number
}

const brands = ref<IBrandItem[]>([
  {
    id: '1',
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    id: '2',
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    id: '3',
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    id: '4',
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    id: '5',
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  }])
</script>
