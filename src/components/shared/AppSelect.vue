<template>
  <el-select
    v-model="model"
    filterable
    class="app-select"
  >
    <div v-if="groupKeyLabel && groupKeyValue">
      <el-option-group
        v-for="group in options"
        :key="group[groupKeyLabel]"
        :label="group[groupKeyLabel]"
      >
        <el-option
          v-for="item in group[groupKeyValue]"
          :key="item[keyValue]"
          :label="item[keyLabel]"
          :value="item[keyValue]"
        />
      </el-option-group>
    </div>

    <div v-else>
      <el-option
        v-for="item in options"
        :key="item[keyValue]"
        :label="item[keyLabel]"
        :value="item[keyValue]"
      />
    </div>
  </el-select>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    options: Record<string, any>[]
    keyLabel?: string
    keyValue?: string
    groupKeyLabel?: string
    groupKeyValue?: string
  }>(),
  {
    keyLabel: 'value',
    keyValue: 'value'
  }
)

const model = defineModel<any>()
</script>
