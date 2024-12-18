<template>
  <el-form
    ref="formRef"
    :model="createCarData"
    show-message
    scroll-to-error
    :scroll-into-view-options="{behavior: 'smooth', block: 'start'}"
    :rules="createCarValidationRules"
    class="titled-form w-full flex flex-col gap-12.5 py-12.5 px-25 bg-creamy"
  >
    <CreateCarImageUpload v-model="createCarData" />

    <CreateCarFormGroup :section-number="2" title="Основна інформація">
      <el-form-item label="Марка авто" prop="models.brand">
        <AppSelect
          v-model="createCarData.models.brand"
          placeholder="Оберіть марку"
          key-label="brand_name"
          key-value="brand"
          :options="sortedBrands"
        />
      </el-form-item>

      <el-form-item label="Модель авто" prop="model_id">
        <el-tooltip
          effect="dark"
          :disabled="!!createCarData.models.brand.length"
          content="Спершу оберіть марку"
          placement="top"
        >
          <AppSelect
            v-model="createCarData.model_id"
            placeholder="Оберіть модель"
            :disabled="!createCarData.models.brand.length"
            group-key-label="brand"
            group-key-value="models"
            key-value="id"
            key-label="model"
            :options="searchStore.mappedModels([createCarData.models.brand])"
          />
        </el-tooltip>
      </el-form-item>

      <el-form-item label="Тип палива" prop="fuel_type">
        <AppSelect
          v-model="createCarData.fuel_type"
          placeholder="Оберіть тип палива"
          key-label="label"
          key-value="value"
          :options="searchStore.searchFilterOptions.fuelTypes"
        />
      </el-form-item>

      <el-form-item label="Коробка передач" prop="transmission_type">
        <AppSelect
          v-model="createCarData.transmission_type"
          placeholder="Оберіть тип коробки передач"
          key-label="label"
          key-value="value"
          :options="searchStore.searchFilterOptions.transmissionTypes"
        />
      </el-form-item>

      <el-form-item
        label="Тип приводу"
        prop="drive_type"
      >
        <AppSelect
          v-model="createCarData.drive_type"
          placeholder="Оберіть тип приводу"
          key-value="value"
          key-label="label"
          :options="searchStore.searchFilterOptions.driveTypes"
        />
      </el-form-item>

      <el-form-item
        label="Стиль кузова"
        prop="body_type"
      >
        <AppSelect
          v-model="createCarData.body_type"
          placeholder="Оберіть стиль кузова"
          key-label="label"
          key-value="value"
          :options="searchStore.searchFilterOptions.bodyType"
        />
      </el-form-item>

      <el-form-item
        label="Рік випуску"
        prop="manufacture_year"
      >
        <AppSelect
          v-model="createCarData.manufacture_year"
          placeholder="Оберіть рік"
          key-label="label"
          key-value="value"
          :options="searchStore.searchFilterOptions.manufactureYear"
        />
      </el-form-item>

      <el-form-item
        v-if="createCarData.fuel_type === 'Electric'"
        label="Потужність двигуна (кВт)"
        prop="engine_volume"
      >
        <AppInput
          v-model="createCarData.engine_volume"
          v-maska="'####'"
          placeholder="Введіть потужність двигуна (кВт)"
        />
      </el-form-item>

      <el-form-item v-else label="Об'єм двигуна (л)" prop="engine_volume">
        <AppSelect
          v-model="createCarData.engine_volume"
          key-label="label"
          key-value="value"
          placeholder="Оберіть об'єм"
          :options="searchStore.searchFilterOptions.engineVolume"
        />
      </el-form-item>

      <el-form-item label="Потужність двигуна (к.с.)" prop="engine_power">
        <div class="flex gap-2 items-center w-full">
          <AppInput
            v-model="createCarData.engine_power"
            type="number"
            placeholder="Введіть потужність двигуна (к.с.)"
          />
          <p class="body-1">к.с.</p>
        </div>
      </el-form-item>

      <el-form-item label="Пробіг" prop="mileage">
        <div class="flex gap-2 items-center w-full">
          <AppInput
            v-model="createCarData.mileage"
            type="number"
            placeholder="Введіть пробіг"
          />
          <p class="body-1">тис.км.</p>
        </div>
      </el-form-item>

      <el-form-item label="Реєстраційний номер" prop="registration_plate">
        <div class="flex gap-2 items-center w-full">
          <AppInput
            v-model="createCarData.registration_plate"
            placeholder="Введіть реєстраційний номер"
          />
        </div>
      </el-form-item>

      <el-form-item label="VIN Код" prop="vin">
        <div class="flex gap-2 items-center w-full">
          <AppInput
            v-model="createCarData.vin"
            placeholder="Введіть VIN код"
          />
        </div>
      </el-form-item>

      <el-form-item label="Місто" prop="location">
        <AppSelect
          v-model="createCarData.location"
          placeholder="Оберіть місто"
          key-label="label"
          key-value="value"
          :options="searchStore.searchFilterOptions.location"
        />
      </el-form-item>
    </CreateCarFormGroup>

    <CreateCarFormGroup :section-number="3" title="Опис автомобіля">
      <div class="text-gravel">
        <p class="body-2">В даному полі забороняється:</p>
        <ul class="mt-2.5 ml-2.5 secondary">
          <li class="flex gap-3.5 items-center">
            <i class="icon-arrow-drop-right text-xs" />
            Залишати посилання або контактні дані
          </li>
          <li class="flex gap-3.5 items-center">
            <i class="icon-arrow-drop-right text-xs" />
            Пропонувати інші (особисті) послуги
          </li>
        </ul>
      </div>
      <div class="max-w-[800px]">
        <AppInput
          v-model="createCarData.description"
          class="h-44"
          input-style="height: 176px; padding: 20px; font-size: 16px;"
          resize="none"
          type="textarea"
          maxlength="2000"
          show-word-limit
          placeholder="Введіть опис"
        />
      </div>
    </CreateCarFormGroup>

    <CreateCarFormGroup :section-number="4" title="Характеристики автомобіля">
      <el-form-item
        v-for="(field, index) in carCharacteristicsFields"
        :key="index"
        :label="field.label"
        :prop="field.prop"
      >
        <AppSelect
          v-model="createCarData[field.prop as keyof typeof createCarData]"
          placeholder="Оберіть"
          key-label="label"
          key-value="value"
          :options="(searchStore
            .searchFilterOptions[field.optionsKey as keyof ISearchFiltersOptions] as IFilterOption[])"
        />
      </el-form-item>
    </CreateCarFormGroup>

    <CreateCarFormGroup :section-number="5" title="Опції">
      <el-form-item
        v-for="(item, index) in carOptionsFields"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <AppSelect
          v-model="createCarData[item.prop as keyof typeof createCarData]"
          placeholder="Оберіть"
          key-label="label"
          key-value="value"
          :options="(searchStore
            .searchFilterOptions[item.optionsKey as keyof ISearchFiltersOptions] as IFilterOption[])"
        />
      </el-form-item>
    </CreateCarFormGroup>

    <CreateCarFormGroup :section-number="6" title="Додаткові опції">
      <el-form-item
        v-for="(item, index) in carAdditionalOptionsFields"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <AppSelect
          v-model="carFeatures[item.prop as keyof ICarFeatures]"
          placeholder="Оберіть"
          key-label="label"
          key-value="value"
          multiple
          collapse-tags-tooltip
          collapse-tags
          :options="(searchStore
            .searchFilterOptions[item.optionsKey as keyof ISearchFiltersOptions] as IFilterOption[])"
        />
      </el-form-item>
    </CreateCarFormGroup>

    <CreateCarFormGroup :section-number="7" title="Вартість">
      <el-form-item label="Ціна" prop="price">
        <div class="flex gap-2 items-center w-full">
          <AppInput
            v-model="createCarData.price"
            v-maska="'$######'"
            placeholder="Введіть вартість"
          />
        </div>
      </el-form-item>
    </CreateCarFormGroup>

    <div class="body-2 text-gray-dark">
      <el-checkbox v-model="acceptedPolicy">
        <span>Я згоден(на) з умовами </span>

        <a class="font-bold">Угоди про надання послуг</a>
      </el-checkbox>

      <p class="mt-7">
        Ваші персональні дані будуть оброблені та захищені згідно з
        <a class="font-bold">Політикою приватності</a>
      </p>

      <AppButton
        :disabled="!acceptedPolicy"
        class="w-[400px] mt-7"
        @click="publishCar"
      >
        Опублікувати оголошення
      </AppButton>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const loading = defineModel<boolean>('loading', { required: true })
const isPublished = defineModel<IPublishStatus>('isPublished', { required: true })
const carId = defineModel<string>('carId', { required: true })

const props = defineProps<{
  carData?: TCar & ICarFeatures
}>()

const searchStore = useSearchStore()
const authStore = useAuthStore()

const createCarData = ref<TCar | ICarData>(
  (props.carData ? cloneDeep(props.carData) : cloneDeep(createCarService.defaultCreateData))
)

const carFeatures = ref<ICarFeatures>({
  safety_features: [],
  comfort_features: [],
  multimedia_features: [],
  optic_features: [],
  parking_assistance: [],
  airbag_features: []
})

const formRef = ref<FormInstance>()
const acceptedPolicy = ref(false)

const sortedBrands = computed(() => searchStore.searchFilterOptions.brands.toSorted((a, b) => {
  return a.brand.localeCompare(b.brand)
}))

const carCharacteristicsFields = [
  { label: 'Колір', prop: 'color', optionsKey: 'colors' },
  { label: 'Участь в ДТП', prop: 'was_in_accident', optionsKey: 'involvedAccident' },
  { label: 'Технічний стан', prop: 'technical_condition', optionsKey: 'techCondition' },
  { label: 'Лакофарбове покриття', prop: 'paint_condition', optionsKey: 'paintType' }
]

const carOptionsFields = [
  { label: 'Кондиціонер', prop: 'air_conditioning', optionsKey: 'airConditioning' },
  { label: 'Електросклопідйомники', prop: 'electric_windows', optionsKey: 'electricWindows' },
  { label: 'Матеріали салону', prop: 'interior_material', optionsKey: 'interiorMaterials' },
  { label: 'Колір салону', prop: 'interior_color', optionsKey: 'interiorColors' },
  { label: 'Підсилювач керма', prop: 'power_steering', optionsKey: 'powerSteering' },
  { label: 'Регулювання керма', prop: 'steering_wheel_adjustment', optionsKey: 'steeringWheelAdjustments' },
  { label: 'Запасне колесо', prop: 'spare_wheel', optionsKey: 'spareWheels' },
  { label: 'Фари', prop: 'headlights', optionsKey: 'headlights' },
  { label: 'Регулювання сидінь', prop: 'interior_seats_adjustment', optionsKey: 'interiorSeatsAdjustments' },
  { label: 'Підігрів сидінь', prop: 'heated_seats', optionsKey: 'heatedSeats' }
]

const carAdditionalOptionsFields = [
  { label: 'Безпека', prop: 'safety_features', optionsKey: 'safetyFeature' },
  { label: 'Салон та комфорт', prop: 'comfort_features', optionsKey: 'comfortFeatures' },
  { label: 'Мультимедія', prop: 'multimedia_features', optionsKey: 'multimediaFeatures' },
  { label: 'Оптика', prop: 'optic_features', optionsKey: 'opticFeatures' },
  { label: 'Паркування', prop: 'parking_assistance', optionsKey: 'parkingFeatures' },
  { label: 'Подушка безпеки', prop: 'airbag_features', optionsKey: 'airbagFeatures' }
]

const createCarValidationRules: FormRules = {
  location: [
    { required: true, message: 'Вкажіть місцезнаходження', trigger: ['change', 'blur'] }
  ],
  manufacture_year: [
    { required: true, message: 'Вкажіть рік виробництва', trigger: ['change', 'blur'] }
  ],
  transmission_type: [
    { required: true, message: 'Оберіть тип коробки передач', trigger: ['change', 'blur'] }
  ],
  fuel_type: [
    { required: true, message: 'Оберіть тип пального', trigger: ['change', 'blur'] }
  ],
  price: [
    { required: true, message: 'Вкажіть ціну', trigger: 'blur' },
    { min: 4, max: 7, message: 'Вкажіть ціну у проміжку $100-$999k', trigger: 'blur' }
  ],
  mileage: [
    { required: true, message: 'Вкажіть пробіг', trigger: 'blur' },
    { min: 0, max: 2000, message: 'Вкажіть пробіг у проміжку 0-2000 (тис.км)', trigger: 'blur' }
  ],
  vin: [
    { required: true, pattern: /^[A-HJ-NPR-Z0-9]{17}$/, message: 'Введіть коректний VIN-код (17 символів, букви або цифри, окрім "I", "O", "Q")', trigger: 'blur' }
  ],
  model_id: [
    { required: true, message: 'Оберіть модель', trigger: ['change', 'blur'] }
  ],
  'models.brand': [
    { required: true, message: 'Оберіть бренд', trigger: ['change', 'blur'] }
  ],
  drive_type: [
    { required: true, message: 'Оберіть тип приводу', trigger: ['change', 'blur'] }
  ],
  body_type: [
    { required: true, message: 'Вкажіть тип кузова', trigger: ['change', 'blur'] }
  ],
  engine_volume: [
    { required: true, message: 'Вкажіть дані про двигун', trigger: ['change', 'blur'] }
  ],
  registration_plate: [
    { required: true, message: 'Вкажіть номерний знак', trigger: 'blur' },
    {
      pattern: /^[A-Z]{2}\d{4}[A-Z]{2}$/,
      message: 'Номерний знак повинен бути у форматі: дві літери, чотири цифри, дві літери (англійською)',
      trigger: 'blur'
    }
  ],
  color: [
    { required: true, message: 'Вкажіть колір', trigger: ['change', 'blur'] }
  ]
}

async function publishCar () {
  try {
    formRef.value && await formRef.value.validate()

    loading.value = true
    const payload = createCarData.value

    if (!props.carData) {
      carId.value = await createCarService.createCar({
        ...payload,
        user_id: authStore.user?.sub
      }) || ''
    } else {
      await createCarService.updateCar(createCarData.value, props.carData.id)
    }

    if (carId.value) {
      await createCarService.addAllFeatures(carFeatures.value, carId.value)
    } else if (props.carData) {
      await createCarService.removeAllFeatures(props.carData.id)
      await createCarService.addAllFeatures(carFeatures.value, props.carData.id)
    }

    isPublished.value.isReqEnd = true
    Object.assign(createCarData.value, cloneDeep(createCarService.defaultCreateData))
  } catch {
    ElNotification({
      title: 'Помилка',
      message: "Введіть коректні дані та зповніть всі обов'язкові поля",
      type: 'error'
    })
    loading.value = false
  }
}

watch(() => props.carData, () => {
  carFeatures.value = {
    safety_features: props.carData?.safety_features || [],
    comfort_features: props.carData?.comfort_features || [],
    multimedia_features: props.carData?.multimedia_features || [],
    optic_features: props.carData?.optic_features || [],
    parking_assistance: props.carData?.parking_assistance || [],
    airbag_features: props.carData?.airbag_features || []
  }
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  if (props.carData) {
    createCarData.value.was_in_accident = props.carData.was_in_accident?.toString().toUpperCase() || ''
    createCarData.value.mileage = props.carData.mileage.toString()
  }
})
</script>
