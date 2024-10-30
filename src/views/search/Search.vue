<template>
  <div>
    <VehicleTypes :data="query.vehicleTypes" />
  </div>
</template>

<script setup lang="ts">
import VehicleTypes from './components/SearchVehicleTypes.vue'
defineProps<{
  query: ICarsSearchData
}>()
</script>
