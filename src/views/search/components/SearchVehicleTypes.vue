<template>
  <SectionLayout>
    <el-checkbox-group v-model="data" class="grid grid-cols-4 gap-x-5 gap-y-8">
      <CheckboxButton
        v-for="item in vehicleTypes"
        :key="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </CheckboxButton>
    </el-checkbox-group>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'
import CheckboxButton from '@/views/search/components/shared/SearchCheckboxButton.vue'

defineProps<{
  vehicleTypes: IFilterOption[]
}>()

const data = defineModel<string[]>()

</script>
