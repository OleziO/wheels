<template>
  <section class="bg-blue px-25 py-22 text-creamy ">
    <div class="flex justify-between items-center gap-5 max-w-[1440px] mx-auto">
      <div class="flex flex-col">
        <h2 class="h1 ">Продайте свій автомобіль у 3 простих кроки!</h2>
        <p class="body-1 mt-4 w-[97%] leading-6 tracking-wider">
          Введіть трохи деталей, розмістіть оголошення у нас, знайдіть ідеального покупця
        </p>
        <AppButton
          type="secondary"
          class="mt-12.5 w-[65%]"
          @click="router.push({ name: $routeNames.createCar})"
        >
          Продати автомобіль
        </AppButton>
      </div>
      <el-image fit="cover" class="h-full !max-w-[590px]" src="src/assets/images/orange-car.png" />
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

</script>
