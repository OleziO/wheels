<template>
  <section class="bg-blue px-25 py-22 text-creamy flex justify-between items-center gap-5">
    <div class="flex flex-col">
      <h2 class="h1 ">Продайте свій автомобіль у 3 простих кроки!</h2>
      <p class="body-1 mt-4 w-[97%] leading-6 tracking-wider">
        Введіть трохи деталей, розмістіть оголошення у нас, знайдіть ідеального покупця
      </p>
      <AppButton disabled type="secondary" class="mt-12.5 w-[65%]">Продати автомобіль</AppButton>
    </div>
    <el-image fit="cover" class="h-full !max-w-[590px]" :src="path" />
  </section>
</template>

<script setup lang="ts">
const path = 'src/assets/images/home-page/main-page-selling-section.png'
</script>
