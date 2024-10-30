<template>
  <SectionLayout class="max-w-[1440px] mx-auto">
    <h2>Популярні пошукові запити</h2>
    <el-checkbox-group v-model="data" class="grid grid-cols-4 gap-x-5 gap-y-8">
      <el-checkbox-button
        v-for="item in vehicleTypes"
        :key="item.value"
        :value="item.value"
        class="serch-type flex justify-center items-center w-full"
      >
        {{ item.label }}
      </el-checkbox-button>
    </el-checkbox-group>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'
import searchService from '@/services/search-service/search.service'

const data = defineModel<string[]>('data')
const vehicleTypes = searchService.vehicleTypes

</script>
