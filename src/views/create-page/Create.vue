<template>
  <div class="w-full">
    <div class="w-full max-w-[1440px] mx-auto px-25">
      <h2 class="h2 mt-12.5 mb-10">Як швидко продати свій автомобіль</h2>
      <div class="w-full flex justify-between gap-5 mb-25">
        <CreateInfoCard
          v-for="(info) in createService.infoCards"
          :key="info.icon"
          :title="info.title"
          :text="info.text"
          :icon="(info.icon as TIcons)"
        />
      </div>
    </div>

    <div>
      <div class="w-fit bg-creamy ml-25 rounded-tl-25 rounded-tr-25 py-8 px-32">
        <h2 class="h2">Створити оголошення</h2>
      </div>
      <div class="w-full flex flex-col gap-12.5 py-12.5 px-25 bg-creamy">
        <CreateFormGroup :section-number="1" title="Додайте фотографії вашого автомобіля">
          <div class="flex gap-4 flex-wrap">
            <el-image
              v-for="picture in createStore.createData.carPictures"
              :key="picture"
              class="h-28 rounded-lg"
              :src="picture"
            />

            <AppButton
              type="line-light"
              class="!border-dashed h-28 !text-blue-light
              hover:!text-creamy-light !bg-creamy-light hover:!bg-blue-light"
              icon="icon-add"
              @click="linkDialogVisible = true"
            >
              Додати фото
            </AppButton>

            <CreateAddPictureDiaolog v-model="linkDialogVisible" />
          </div>
        </CreateFormGroup>
        <CreateFormGroup :section-number="2" title="Основна інформація">
          <CreateFormItem title="Тип транспорту">
            <AppSelect
              v-model="createStore.createData.vehicleType"
              placeholder="Оберіть тип"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.vehicleTypes"
            />
          </CreateFormItem>

          <CreateFormItem title="Марка авто">
            <AppSelect
              v-model="createStore.createData.brand"
              placeholder="Оберіть марку"
              key-label="brand_name"
              key-value="brand"
              :options="selectCarData.searchFilterOptions.brands"
            />
          </CreateFormItem>

          <CreateFormItem title="Модель авто">
            <AppSelect
              v-model="createStore.createData.model"
              placeholder="Оберіть модель"
              group-key-label="brand"
              group-key-value="models"
              key-value="id"
              key-label="model"
              :options="selectCarData.mappedModels(['BMW'])"
            />
          </CreateFormItem>

          <CreateFormItem title="Рік випуску">
            <AppSelect
              v-model="createStore.createData.manufactureYear"
              placeholder="Оберіть рік"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.manufactureYear"
            />
          </CreateFormItem>

          <CreateFormItem title="Пробіг">
            <div class="flex gap-2 items-center">
              <AppInput v-model="createStore.createData.mileage" placeholder="Введіть пробіг" />
              <p class="body-1">тис.км.</p>
            </div>
          </CreateFormItem>

          <CreateFormItem title="Стиль кузова">
            <AppSelect
              v-model="createStore.createData.bodyType"
              placeholder="Оберіть стиль кузова"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.bodyType"
            />
          </CreateFormItem>

          <CreateFormItem title="Місто">
            <AppSelect
              v-model="createStore.createData.location"
              placeholder="Оберіть місто"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.location"
            />
          </CreateFormItem>
        </CreateFormGroup>
        <CreateFormGroup :section-number="3" title="Опис автомобіля">
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
          <AppInput
            v-model="createStore.createData.description"
            class="h-44"
            input-style="padding: 20px; font-size: 16px;"
            resize="none"
            type="textarea"
            maxlength="2000"
            show-word-limit
            placeholder="Введіть опис"
          />
        </CreateFormGroup>
        <CreateFormGroup :section-number="4" title="Характеристики автомобіля">
          <CreateFormItem title="Колір">
            <AppSelect
              v-model="createStore.createData.color"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.colors"
            />
          </CreateFormItem>

          <CreateFormItem title="Участь в ДТП">
            <AppSelect
              v-model="createStore.createData.involvedAccident"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.involvedAccident"
            />
          </CreateFormItem>

          <CreateFormItem title="Технічний стан">
            <AppSelect
              v-model="createStore.createData.techCondition"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.techCondition"
            />
          </CreateFormItem>

          <CreateFormItem title="Лакофарбове покриття">
            <AppSelect
              v-model="createStore.createData.paintType"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.paintType"
            />
          </CreateFormItem>
        </CreateFormGroup>

        <CreateFormGroup :section-number="5" title="Опції">
          <CreateFormItem title="Кондиціонер">
            <AppSelect
              v-model="createStore.createData.airConditioning"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.airConditioning"
            />
          </CreateFormItem>

          <CreateFormItem title="Електросклопідйомники">
            <AppSelect
              v-model="createStore.createData.electricWindows"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.electricWindows"
            />
          </CreateFormItem>

          <CreateFormItem title="Матеріали салону">
            <AppSelect
              v-model="createStore.createData.interiorMaterials"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.interiorMaterials"
            />
          </CreateFormItem>

          <CreateFormItem title="Колір салону">
            <AppSelect
              v-model="createStore.createData.interiorColors"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.interiorColors"
            />
          </CreateFormItem>

          <CreateFormItem title="Підсилювач керма">
            <AppSelect
              v-model="createStore.createData.powerSteering"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.powerSteering"
            />
          </CreateFormItem>

          <CreateFormItem title="Регулювання керма">
            <AppSelect
              v-model="createStore.createData.steeringWheelAdjustments"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.steeringWheelAdjustments"
            />
          </CreateFormItem>

          <CreateFormItem title="Запасне колесо">
            <AppSelect
              v-model="createStore.createData.spareWheels"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.spareWheels"
            />
          </CreateFormItem>

          <CreateFormItem title="Фари">
            <AppSelect
              v-model="createStore.createData.headlights"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.headlights"
            />
          </CreateFormItem>

          <CreateFormItem title="Регулювання сидінь">
            <AppSelect
              v-model="createStore.createData.interiorSeatsAdjustments"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.interiorSeatsAdjustments"
            />
          </CreateFormItem>

          <CreateFormItem title="Підігрів сидінь">
            <AppSelect
              v-model="createStore.createData.heatedSeats"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              :options="selectCarData.searchFilterOptions.heatedSeats"
            />
          </CreateFormItem>
        </CreateFormGroup>

        <CreateFormGroup :section-number="6" title="Додаткові опції">
          <CreateFormItem title="Безпека">
            <AppSelect
              v-model="createStore.createData.safetyFeature"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.safetyFeature"
            />
          </CreateFormItem>

          <CreateFormItem title="Салон та комфорт">
            <AppSelect
              v-model="createStore.createData.comformFeatures"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.comformFeatures"
            />
          </CreateFormItem>

          <CreateFormItem title="Мультимедія">
            <AppSelect
              v-model="createStore.createData.multimediaFeatures"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.multimediaFeatures"
            />
          </CreateFormItem>

          <CreateFormItem title="Оптика">
            <AppSelect
              v-model="createStore.createData.opticFeatures"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.opticFeatures"
            />
          </CreateFormItem>

          <CreateFormItem title="Система допомоги при паркуванні">
            <AppSelect
              v-model="createStore.createData.parkingFeatures"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.parkingFeatures"
            />
          </CreateFormItem>

          <CreateFormItem title="Подушка безпеки">
            <AppSelect
              v-model="createStore.createData.airbagFeatures"
              placeholder="Оберіть"
              key-label="label"
              key-value="value"
              multiple
              collapse-tags
              :options="selectCarData.searchFilterOptions.airbagFeatures"
            />
          </CreateFormItem>
        </CreateFormGroup>

        <CreateFormGroup :section-number="7" title="Вартість">
          <CreateFormItem title="Ціна">
            <div class="flex gap-2 items-center">
              <p class="body-1">$</p>
              <AppInput
                v-model="createStore.createData.price"
                type="number"
                max="1000000"
                placeholder="Введіть вартість"
              />
            </div>
          </CreateFormItem>
        </CreateFormGroup>
        <div class="body-2 text-gray-dark">
          <el-checkbox v-model="acceptedСonditions">
            Я згоден(на) з умовами
            <a class="font-bold">Угоди про надання послуг</a>
          </el-checkbox>

          <p class="mt-7">
            Ваші персональні дані будуть оброблені та захищені згідно з
            <a class="font-bold">Політикою приватності</a>
          </p>

          <div class="flex gap-5 items-center mt-7">
            <AppButton
              :disabled="!acceptedСonditions"
              class="w-[400px]"
              @click="carSubmit"
            >
              Розмістити оголошення
            </AppButton>
            <p
              class="max-w-[305px] secondary text-gray-light"
            >
              При кліці на кнопку “Розмістити оголошення”
              Ви перейдете до публікації свого оголошення
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import createService from '@/views/create-page/create.service'
import CreateFormGroup from '@/views/create-page/components/CreateFormGroup.vue'
import CreateFormItem from '@/views/create-page/components/CreateFormItem.vue'
import CreateInfoCard from '@/views/create-page/components/CreateInfoCard.vue'
import CreateAddPictureDiaolog from './components/CreateAddPictureDiaolog.vue'

const selectCarData = useSearchStore()
const createStore = useCreate()
const acceptedСonditions = ref(false)

const linkDialogVisible = ref(false)

function carSubmit () {
  createService.createCar(createService.toDatabaseObject(createStore.createData))
}

onMounted(async () => {
  await selectCarData.getSearchFilterOptions()
})

</script>
