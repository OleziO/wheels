<template>
  <CreateCarFormGroup :section-number="1" title="Додайте фотографії вашого автомобіля">
    <div class="flex gap-4 flex-wrap">
      <div
        v-for="(picture, index) in createCarData.car_pictures"
        :key="picture"
        class="relative group cursor-pointer"
      >
        <el-image
          fit="cover"
          class="h-28 !w-40 rounded-lg"
          :src="picture"
        >
          <template #error>
            <div
              class="h-28 !w-40 rounded-lg flex justify-center text-center
              items-center bg-creamy-light text-red-error border border-red-error"
            >
              <p>Помилка завантаження</p>
            </div>
          </template>
        </el-image>

        <div
          class="absolute top-0 w-full h-full bg-opacity-70 rounded-lg
                 hidden group-hover:flex justify-center items-center bg-creamy"
          @click="createCarData.car_pictures?.splice(index, 1)"
        >
          <i
            class="icon-delete-bin-2 text-red-error"
          />
        </div>
      </div>

      <AppButton
        type="line-light"
        class="!border-dashed h-28 !text-blue-light
              hover:!text-creamy-light !bg-creamy-light hover:!bg-blue-light"
        icon="icon-add"
        @click="linkDialogVisible = true"
      >
        Додати фото
      </AppButton>

      <CreateCarAddPictureDialog v-model:create-car-data="createCarData" v-model="linkDialogVisible" />
    </div>
  </CreateCarFormGroup>
</template>

<script setup lang="ts">
const createCarData = defineModel<ICarData | TCar>({ required: true })

const linkDialogVisible = ref(false)
</script>
