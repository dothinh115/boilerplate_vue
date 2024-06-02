<template>
  <RouterLink
    class="flex items-center space-x-4 duration-100 last:rounded-b-[10px] w-max min-w-full"
    :class="{
      'odd:bg-gray-50 even:bg-gray-200 lg:hover:bg-opacity-90 p-2': localData
    }"
    :to="{
      params: {
        post: route.params.post,
        id: localData?._id ? localData?._id : ''
      },
      query: route.query
    }"
  >
    <div
      :style="{
        width: localWidth[field] + 'px'
      }"
      class="flex space-x-2 group cursor-pointer items-center"
      v-for="(field, index) in Object.keys(props.schema)"
      :key="index"
    >
      <p class="truncate" v-if="localData">
        <span
          :class="{
            'font-bold': $typeCheck(localData[field]) === 'boolean',
            'text-red-600':
              $typeCheck(localData[field]) === 'boolean' && localData[field] === false,
            'text-green-900 ':
              $typeCheck(localData[field]) === 'boolean' && localData[field] === true
          }"
        >
          {{
            field === 'password'
              ? '********'
              : localData[field] === 0
                ? localData[field]
                : localData[field] === false
                  ? localData[field]
                  : localData[field]
                    ? localData[field]
                    : 'null'
          }}
        </span>
      </p>
      <div v-else @click="handleSort(field)" class="flex items-center space-x-2 min-w-full">
        <span> {{ field }} </span>
        <i
          class="fa-solid fa-caret-down hidden items-center group-lg:hover:inline-block"
          v-if="sortBy.includes(field)"
          :class="{
            '!inline-block': sortBy === field || sortBy.slice(1) === field,
            'rotate-180': (sortBy as string).startsWith('-') && sortBy.slice(1) === field
          }"
        ></i>
      </div>
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
import { usePlugin } from '@/composables/usePlugins'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type TProps = {
  schema: any
  sortBy: string
  item?: any
  width: {
    [key: string]: number
  }
}

const route = useRoute()
const props = defineProps<TProps>()
const emits = defineEmits(['handleSort'])
const { $widthCalc, $typeCheck } = usePlugin()
const localData = ref(props.item)
const localWidth = ref<{
  [key: string]: number
}>($widthCalc(props.width))

function handleSort(field: string) {
  emits('handleSort', field)
}
watch(
  () => [props.width],
  () => {
    localWidth.value = $widthCalc(props.width)
  }
)

watch(
  () => props.item,
  (newVal) => {
    localData.value = newVal
  }
)
</script>
