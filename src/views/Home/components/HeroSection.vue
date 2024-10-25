<template>
  <section
    class="relative w-full bg-green-dark flex pl-25 py-19 text-creamy h-[630px]"
  >
    <div class="flex flex-col gap-4 w-2/3">
      <h1
        class="font-unbounded font-bold
        text-[64px] leading-[79px]"
      >
        Знайди ідеальний автомобіль
      </h1>

      <p class="body-2 w-64">Щодня нові актуальні пропозиції від перевірених дилерів.</p>
    </div>

    <el-image fit="cover" class="h-full absolute top-0 right-0" :src="path" />
  </section>
</template>

<script setup lang="ts">
const path = 'src/assets/images/main-page-hero-section.png'
</script>
