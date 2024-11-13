<template>
  <div
    class="flex justify-between whitespace-nowrap relative body-2 text-gray-dark
         bg-orange-light first:bg-blue-extra-light p-4 rounded-3xl rounded-br-none items-center"
  >
    <div class="flex gap-2 items-center">
      <el-avatar class="w-10 h-10 rounded-full overflow-hidden" :src="bit.user_profiles.avatar || ''">
        <div class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
          <i class="icon-user-3 h3" />
        </div>
      </el-avatar>

      <p>
        {{ bit.user_profiles.first_name }} {{ bit.user_profiles.last_name }}
      </p>
    </div>

    <p>{{ bitAmount }}</p>

    <p class="absolute -bottom-[21px] right-0 secondary text-gray-light">{{ time }}</p>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps <{
  bit: TBidItem
}>()

const bitAmount = computed(() => moneyService.numToMoneyWithFormat(props.bit.amount, '$', 'start'))
const time = computed(() => dayjs(props.bit.created_at).format('HH:mm'))

</script>
