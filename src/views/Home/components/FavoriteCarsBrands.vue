<template>
  <SectionLayout class="mb-12.5">
    <h2>Шукайте улюблені бренди</h2>
    <div class="flex gap-9">
      <AppButton v-for="brand in brands" :key="brand.name" class="h-fit shadow hover:scale-110" type="icon">
        <div class="flex flex-col items-center gap-4 p-12.5">
          <el-image :src="brand.picture" class="w-full px-8" />
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

interface IBrandItem {
  name: string
  picture: string
  count: number
}

const brands = ref<IBrandItem[]>([
  {
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  },
  {
    name: 'Mercedes-Benz',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    count: 123
  }])
</script>
