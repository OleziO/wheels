<template>
  <el-dialog
    v-model="showCreateModal"
    v-loading.fullscreen="loading"
    class="custom-modal max-w-[600px] rounded-lg bg-creamy-light"
    @close="handleClose"
  >
    <div class="w-full px-25 py-6 flex flex-col gap-10">
      <h3 class="h3 text-gray-dark">Створити аукціон</h3>

      <el-form
        ref="createAuctionFormRef"
        :model="newAuctionData"
        show-message
        :rules="validationRules"
        class="flex flex-col gap-4"
      >
        <el-form-item prop="car_id">
          <AppSelect
            v-model="newAuctionData.car_id"
            :options="myCars"
            key-label="label"
            key-value="id"
            placeholder=" Оберіть автомобіль"
          />
        </el-form-item>

        <el-form-item prop="default_bid">
          <AppInput
            v-model="newAuctionData.default_bid"
            v-maska="'$########'"
            placeholder="Введіть початкову суму"
          />
        </el-form-item>

        <el-form-item prop="bid_time">
          <AppSelect
            v-model="newAuctionData.bid_time"
            :options="bidTimeOptions"
            key-label="label"
            key-value="value"
            placeholder="Оберіть час для ставки"
          />
        </el-form-item>
      </el-form>

      <AppButton @click="handleCreateAuction">Створити аукціон</AppButton>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'

defineProps<{
  myCars: (TCar & {label: string})[]
}>()

const showCreateModal = defineModel<boolean>()

const emit = defineEmits(['update-list'])

const authStore = useAuthStore()

const createAuctionFormRef = templateRef<FormInstance>('createAuctionFormRef')

const loading = ref(false)

const newAuctionData = ref<INewAuction>(
  {
    auction_owner_id: authStore.user?.sub,
    car_id: '',
    bid_time: '',
    default_bid: ''
  }
)

const validationRules: FormRules = {
  car_id: [
    { required: true, message: 'Оберіть автомобіль', trigger: ['change', 'blur'] }
  ],
  default_bid: [
    { required: true, message: 'Введіть початкову ставку ($0-$99999999)', trigger: ['change', 'blur'] }
  ],
  bid_time: [
    { required: true, message: 'Оберіть час для ставки', trigger: ['change', 'blur'] }
  ]
}

const bidTimeOptions = [
  {
    label: '1хв',
    value: 1
  },
  {
    label: '3хв',
    value: 3
  },
  {
    label: '5хв',
    value: 5
  },
  {
    label: '10хв',
    value: 10
  },
  {
    label: '30хв',
    value: 30
  },
  {
    label: '1год',
    value: 60
  },
  {
    label: '5год',
    value: 300
  }
]

async function handleCreateAuction () {
  try {
    loading.value = true

    if (await createAuctionFormRef.value.validate()) {
      await auctionsService.createNewAuction({
        ...newAuctionData.value,
        default_bid: newAuctionData.value.default_bid.slice(1)
      })

      emit('update-list')
      handleClose()
      return
    }

    throw new Error()
  } catch {
    ElNotification({
      title: 'Помилка',
      message: 'Невдале створення аукціону, перевірте коретність вводу всіх полів та спробуйте ще раз',
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}

function handleClose () {
  showCreateModal.value = false
}

</script>
