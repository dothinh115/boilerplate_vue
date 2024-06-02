<template>
  <div class="w-screen h-screen bg-[#2148c0] flex justify-center items-center relative">
    <TopRight class="absolute top-0 right-0 w-full md:w-2/3 lg:w-1/2" />
    <BottomLeft class="absolute bottom-0 left-0 w-1/2 lg:w-1/3 xl:w-1/4" />
    <slot />
  </div>
</template>
<script setup lang="ts">
import BottomLeft from '@/components/Icon/Background/BottomLeft.vue'
import TopRight from '@/components/Icon/Background/TopRight.vue'
</script>
