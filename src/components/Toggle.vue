<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <label class="cursor-pointer">
    <input type="checkbox" v-model="localValue" class="hidden peer" />
    <div
      class="w-11 h-6 peer-checked:bg-blue-900 bg-gray-400 rounded-full relative after:content-[''] after:absolute after:block after:h-[90%] after:aspect-1 after:left-[1%] peer-checked:after:left-[unset] after:bg-white after:border after:top-[50%] after:-translate-y-[50%] after:rounded-full peer-checked:after:translate-x-full after:transition-all"
    ></div>
  </label>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

type TProps = {
  modelValue: boolean | undefined
}
const props = defineProps<TProps>()
const emits = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)
watch(
  () => localValue.value,
  (newVal) => {
    emits('update:modelValue', newVal)
  }
)
</script>
