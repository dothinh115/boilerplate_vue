<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Suspense>
    <Teleport :to="'body'">
      <Transition name="fade">
        <div
          class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-[1000]"
          v-if="loading > 0"
        >
          <span class="gg-spinner text-white"></span>
        </div>
      </Transition>
    </Teleport>
  </Suspense>
</template>
<script setup lang="ts">
import { stateStore } from '@/stores/getState'
import { storeToRefs } from 'pinia'

const { loading } = storeToRefs(stateStore())
</script>
