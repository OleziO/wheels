<template>
  <div class="flex flex-col gap-4 p-5 text-primary-light">
    <CarCard :car="carData" />
  </div>
</template>

<script setup lang="ts">

const carData = ref<IBasicCarData>({
  carId: '1',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(),
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
})

</script>
