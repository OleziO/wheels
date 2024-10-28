<template>
  <SectionLayout>
    <h2>Найновіші з пропозицій</h2>
    <CarsCarousel :cars="carsData" />

    <AppButton
      icon="icon-arrow-right-down"
      class="w-[400px] mx-auto mt-12.5"
    >
      Більше пропозицій
    </AppButton>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'

const carsData = ref<IBasicCarData[]>([{
  carId: '1',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
},
{
  carId: '2',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
},
{
  carId: '3',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
},
{
  carId: '4',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
},
{
  carId: '5',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
},
{
  carId: '6',
  carBrand: 'Mercedes-Benz',
  carModel: 'W126',
  manufactureYear: 1985,
  location: 'Львів',
  carPice: 20000,
  carMileage: 20000,
  transmissionType: 'Автоматична',
  fuelType: 'Бензин',
  createdAt: new Date(new Date().getTime() - 30 * 60 * 1000),
  carVin: 'WIN1231',
  carPicture: 'https://cdn3.riastatic.com/photosnew/auto/photo/mercedes-benz_s-class__406916558f.jpg'
}])
</script>
