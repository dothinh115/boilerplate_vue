<template>
  <DefaultLayout>
    <RouteList :schemaApi :dataApi />
  </DefaultLayout>
  <slot />
</template>
<script setup lang="ts">
import RouteList from '@/components/RouteList.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const schemaApi = ref(`/schema/${route.params.post}`)
const dataApi = ref(`/${route.params.post}`)

watch(
  () => route.params.post,
  (newVal) => {
    if (newVal) {
      schemaApi.value = `/schema/${route.params.post}`
      dataApi.value = `/${route.params.post}`
    }
  }
)
</script>
