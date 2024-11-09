<template>
  <HomeSectionWrapper>
    <el-checkbox-group v-model="data" class="grid grid-cols-4 gap-x-5 gap-y-8">
      <SearchCheckboxButton
        v-for="item in vehicleTypes"
        :key="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </SearChcheckboxButton>
    </el-checkbox-group>
  </HomeSectionWrapper>
</template>

<script setup lang="ts">

defineProps<{
  vehicleTypes: IFilterOption[]
}>()

const data = defineModel<string[]>()

</script>
