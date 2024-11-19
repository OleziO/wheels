<template>
  <section
    class="relative w-full bg-green-dark flex pl-25 py-19 text-creamy sm-height:h-[calc(100vh-64px)] h-[630px]"
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

    <el-image fit="cover" class="h-full absolute top-0 right-0" :src="HomeHeroPicture" />
  </section>
</template>

<script setup lang="ts">
import HomeHeroPicture from '@/assets/images/home-page/main-page-hero-section.png'
</script>
