<template>
  <HomeSectionWrapper>
    <h2>Популярні пошукові запити</h2>
    <div class="grid grid-cols-4 gap-5">
      <AppButton
        v-for="search in popularSearches"
        :key="search.title"
        type="line-light"
        :icon="(search.icon as TIcons)"
        @click="replaceRouterQuery($routeNames.search, search.filters)"
      >
        {{ search.title }}
      </AppButton>
    </div>
  </HomeSectionWrapper>
</template>

<script setup lang="ts">
import HomeSectionWrapper from '@/views/home-page/components/HomeSectionWrapper.vue'
import { replaceRouterQuery } from '@/router'

interface IPopularSearch{
  title: string
  icon: string
  filters: Record<string, TSearchFilters>
}

const popularSearches = ref<IPopularSearch[]>([{
  title: 'Сімейний',
  icon: 'icon-team',
  filters: {
    bodyType: ['minivan']
  }
}, {
  title: 'Найкраще в снігу',
  icon: 'icon-snowy',
  filters: {
    bodyType: ['crossover']
  }
}, {
  title: 'Надійний і доступний',
  icon: 'icon-secure-payment',
  filters: {
    price: [0, 10000],
    minRate: 30
  }
},
{
  title: 'Спортивний',
  icon: 'icon-riding',
  filters: {
    minEngine: 3
  }
},
{
  title: 'Доступна розкіш',
  icon: 'icon-vip-diamond',
  filters: {
    price: [5000, 15000],
    minRate: 50
  }
},
{
  title: 'Пригоди і бездоріжжя',
  icon: 'icon-footprint',
  filters: {
    bodyType: ['minivan', 'crossover']
  }
},
{
  title: 'Продаж від власника',
  icon: 'icon-creative-commons-by',
  filters: {
    onlyOwner: 'true'
  }
},
{
  title: 'Економія палива',
  icon: 'icon-steering-fill',
  filters: {
    maxFelConsumption: 7
  }
}
])
</script>
