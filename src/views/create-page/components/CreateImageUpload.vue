<template>
  <CreateFormGroup :section-number="1" title="Додайте фотографії вашого автомобіля">
    <div class="flex gap-4 flex-wrap">
      <el-image
        v-for="picture in createStore.createData.car_pictures"
        :key="picture"
        fit="cover"
        class="h-28 !w-40 rounded-lg"
        :src="picture"
      />

      <AppButton
        type="line-light"
        class="!border-dashed h-28 !text-blue-light
              hover:!text-creamy-light !bg-creamy-light hover:!bg-blue-light"
        icon="icon-add"
        @click="linkDialogVisible = true"
      >
        Додати фото
      </AppButton>

      <CreateAddPictureDialog v-model="linkDialogVisible" />
    </div>
  </CreateFormGroup>
</template>

<script setup lang="ts">
import CreateAddPictureDialog from '@/views/create-page/components/CreateAddPictureDialog.vue'
const createStore = useCreateStore()
const linkDialogVisible = ref(false)
</script>
