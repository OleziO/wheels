<template>
  <el-dialog
    v-model="visible"
    title="Зміна аватару"
    width="500"
    @close="visible = false"
  >
    <span>Введіть URL нового аватару</span>
    <AppInput v-model:="imageValue" />
    <template #footer>
      <div class="mt-4 flex gap-2 w-full">
        <AppButton class="w-full" @click="handleCancel">Відмінити</AppButton>
        <AppButton class="w-full" type="primary" @click="handleSubmit">
          Змінити
        </AppButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>()
const userAvatar = defineModel<string>('userAvatar')
const imageValue = ref<string>('')

function handleCancel () {
  imageValue.value = ''
  visible.value = false
}

function handleSubmit () {
  userAvatar.value = imageValue.value
  imageValue.value = ''
  visible.value = false
}
</script>
