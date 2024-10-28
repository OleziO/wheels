<template>
  <SectionLayout>
    <h2>Популярні пошукові запити</h2>
    <div class="grid grid-cols-4 gap-5">
      <AppButton
        v-for="search in popularSearches"
        :key="search.title"
        type="line-light"
        :icon="(search.icon as TIcons)"
      >
        {{ search.title }}
      </AppButton>
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'

const popularSearches = ref<{
  title: string
  icon: string
}[]>([{
  title: 'Сімейний',
  icon: 'icon-team'
}, {
  title: 'Найкраще в снігу',
  icon: 'icon-snowy'
}, {
  title: 'Надійний і доступний',
  icon: 'icon-secure-payment'
},
{
  title: 'Спортивний',
  icon: 'icon-riding'
},
{
  title: 'Доступна розкіш',
  icon: 'icon-vip-diamond'
},
{
  title: 'Пригоди і бездоріжжя',
  icon: 'icon-footprint'
},
{
  title: 'Продаж від власника',
  icon: 'icon-creative-commons-by'
},
{
  title: 'Економія палива',
  icon: 'icon-steering-fill'
}
])
</script>
