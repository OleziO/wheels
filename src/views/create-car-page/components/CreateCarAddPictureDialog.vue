<template>
  <el-dialog
    v-model="visible"
    title="Додавання картинки"
    width="500"
    @close="visible = false"
  >
    <span>Введіть URL зображення</span>
    <AppInput v-model:="imageValue" />
    <template #footer>
      <div class="mt-4 flex gap-2 w-full">
        <AppButton class="w-full" @click="handleCancel">Відмінити</AppButton>
        <AppButton class="w-full" type="primary" @click="handleSubmit">
          Підтвердити
        </AppButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>()
const createCarData = defineModel<ICarData | TCar>('createCarData', { required: true })
const imageValue = ref<string>('')

function handleCancel () {
  imageValue.value = ''
  visible.value = false
}

function handleSubmit () {
  createCarData.value?.car_pictures?.push(imageValue.value)
  imageValue.value = ''
  visible.value = false
}
</script>
