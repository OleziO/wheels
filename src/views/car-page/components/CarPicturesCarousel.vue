<template>
  <div>
    <VueperSlides
      ref="mainSlideRef"
      :touchable="false"
      fade
      class="no-shadow mainPicture"
      :autoplay="false"
      :bullets="false"
      disable-arrows-on-edges
      fixed-height="575px"
      @slide="secondarySlidesRef.goToSlide($event.currentSlide.index, { emit: false })"
    >
      <VueperSlide
        v-for="(image, i) in computedImages"
        :key="i"
      >
        <template #content>
          <el-image
            :src="image || ''"
            alt="Car Picture"
            class="w-full h-full flex justify-center"
            fit="cover"
          >
            <template #error>
              <div class="w-full h-full flex justify-center items-center h1 text-gray-light">
                <el-image
                  src="./src/assets/images/car-placeholder.jpg"
                  alt="Car Picture"
                  class="w-full h-full flex justify-center"
                  fit="cover"
                />
              </div>
            </template>
          </el-image>
        </template>
      </VueperSlide>
    </VueperSlides>

    <VueperSlides
      v-if="computedImages.length > 1"
      ref="secondarySlidesRef"
      class="no-shadow thumbnails"
      :visible-slides="Math.min(computedImages.length, 4)"
      :touchable="false"
      :bullets="false"
      :gap="2.5"
      fixed-height="130px"
      :arrows="false"
      @slide="mainSlideRef.goToSlide($event.currentSlide.index, { emit: false })"
    >
      <VueperSlide
        v-for="(image, i) in computedImages"
        :key="i"
        :image="image"
        @click="secondarySlidesRef.goToSlide(i)"
      />
    </VueperSlides>
  </div>
</template>

<script setup lang="ts">
import { VueperSlides, VueperSlide } from 'vueperslides'

const props = defineProps<{
  images: string[]
}>()

const mainSlideRef = ref()
const secondarySlidesRef = ref()

const computedImages = computed(() => {
  return !props.images.length ? ['./src/assets/images/car-placeholder.jpg'] : props.images
})

</script>

<style scoped>
.mainPicture {
  box-shadow: 5px 4px 20px 0px #0000001A;;
}

.thumbnails {
  @apply mt-5;
}

.thumbnails .vueperslide {
  transition: 0.3s ease-in-out;
  @apply w-full box-border opacity-70 cursor-pointer;
}

.thumbnails .vueperslide--active {
  @apply opacity-100
}
</style>
