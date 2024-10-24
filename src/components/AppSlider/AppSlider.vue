<template>
  <div :class="type">
    <el-slider
      v-model="model"
      range
      :marks="marks"
      :format-tooltip="formatToolTip"
      :range-start-label="startLabel"
      :range-end-label="endLabel"
      :min="min"
      :max="max"
      :step="step"
    />
  </div>
</template>

<script lang="ts" setup>
const positions: Record<string, TLabelPositions> = {
  start: 'start',
  end: 'end'
}

const defaultType: TSliderTypes = 'primary'

const props = withDefaults(
  defineProps<{
    min: number
    max: number
    step: number
    type?: TSliderTypes
    label?: string
    labelPosition?: TLabelPositions
  }>(),
  {
    type: defaultType,
    labelPosition: 'end'
  }
)

const model = defineModel<number[]>()

const startLabel = computed(() => setLabel(props.min, props.label))
const endLabel = computed(() => setLabel(props.max, props.label))

const marks = computed<TSliderMark>(() => {
  return {
    [props.min]: startLabel.value,
    [props.max]: endLabel.value
  }
})

function setLabel (value: number, label: string = '') {
  let computedLabel = `${value}`

  if (label) {
    if (props.labelPosition && props.labelPosition === positions.start) {
      computedLabel = `${label}${value}`
    } else {
      computedLabel = `${value}${label}`
    }
  }

  return computedLabel
}

function formatToolTip (value: number) {
  return setLabel(value, props.label)
}
</script>
