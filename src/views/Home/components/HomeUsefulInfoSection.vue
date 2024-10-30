<template>
  <SectionLayout class="bg-green-dark relative">
    <div class="px-25 pt-8 pb-11">
      <h2 class="!text-creamy !mb-6">Важливо про автомобілі</h2>

      <ul class="flex flex-col gap-5 ml-25 relative z-50">
        <li v-for="linkData in usefulLinks" :key="linkData.title" class="link-item text-creamy-light">
          <el-link :href="linkData.link" target="_blank" :underline="false">
            <span
              class="flex gap-5 items-center  "
            >
              <i class="icon-arrow-right" />
              <p class="body-1">{{ linkData.title }}</p>
            </span>
          </el-link>
        </li>
      </ul>

      <el-image :src="handImagePath" class="absolute bottom-0 right-[120px] h-full" />
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'

const handImagePath = 'src/assets/images/home-page/hand.png'

const usefulLinks = [
  {
    title: 'Як вибрати авто',
    link: 'https://www.ukrinform.ua/rubric-culture/3150126-ak-vibrati-svij-persij-avtomobil.html'
  },
  {
    title: 'Особливості техогляду',
    link: 'https://otk.in.ua/vodiyam/shho-potribno-dlya-prohodzhennya-otk/pravyla-prohodzhennya-tehoglyadu/'
  },
  {
    title: 'Тонкощі спілкування зі співробітниками поліції',
    link: 'https://tsypin.partners/spilkuvannja-z-policejskimi-na-doroz/'
  },
  {
    title: 'Де і чим заправляти своє авто',
    link: 'https://narscars.com.ua/ua/blog/interesno/na-kakih-zapravkah-luchshe-zapravlyatsya-v-ukraine'
  },
  {
    title: 'Обслуговування автомобіля',
    link: 'https://avtopan.ua/to-avtomobilya/'
  },
  {
    title: 'Поради по страхуванню авто',
    link: 'https://myagent.com.ua/usefuladvices'
  },
  {
    title: 'Як продати авто',
    link: 'https://autopark.ua/uk/blog/pokupka-avto/dokumenty-dlya-prodazhi-avto'
  }
]

</script>

<style scoped lang="scss">
.link-item {
  .el-link {
    &:hover {
      @apply text-orange;
    }
  }
}
</style>
