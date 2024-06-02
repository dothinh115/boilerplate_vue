<template>
  <template v-for="(field, index) in Object.keys(localProps.schema)" :key="index">
    <div
      :class="{
        'flex items-center space-x-4': $typeCheck(localProps.data[field]) === 'boolean',
        'space-y-1': $typeCheck(localProps.data[field]) !== 'boolean'
      }"
    >
      <div class="text-gray-900">{{ field }}:</div>
      <Editor
        api-key="ybvcxe9fj0sj6lcp90640iyvqe3epn8hz97d8hr0j8ad0g0h"
        :init="getEditorInit(field)"
        v-if="localProps.schema[field].richText"
        v-model="localProps.data[field]"
      />

      <div v-else-if="localProps.schema[field].type === 'Boolean'">
        <Toggle v-model="localProps.data[field]" />
      </div>
      <div
        class="flex space-x-2"
        v-else-if="
          $typeCheck(localProps.data[field]) === 'string' ||
          $typeCheck(localProps.data[field]) === 'number' ||
          $typeCheck(localProps.data[field]) === null ||
          $typeCheck(localProps.data[field]) === 'Array'
        "
      >
        <input
          :type="
            $typeCheck(localProps.data[field]) === 'number'
              ? 'number'
              : field === 'password'
                ? 'password'
                : 'text'
          "
          class="input w-full"
          :class="{
            'input-red': error[field],
            'input-blue': !error[field]
          }"
          :disabled="
            field === '_id' || field === 'slug'
              ? true
              : localProps.new
                ? false
                : user?.rootUser
                  ? false
                  : localProps.schema[field].disabled
                    ? true
                    : false
          "
          v-model="localProps.data[field]"
          v-if="!localProps.schema[field].ref"
        />
        <div
          :key="index"
          class="flex flex-wrap"
          v-else-if="
            (localProps.schema[field].ref && localProps.data[field]) ||
            $typeCheck(localProps.data[field]) === 'Array'
          "
          v-show="
            ($typeCheck(localProps.data[field]) === 'Array' && localProps.data[field].length > 0) ||
            ($typeCheck(localProps.data[field]) !== 'Array' && localProps.data[field])
          "
        >
          <template v-if="$typeCheck(localProps.data[field]) === 'Array'">
            <div
              v-for="(item, index) in localProps.data[field]"
              :key="index"
              class="flex items-center justify-center mr-2 mb-2"
            >
              <div
                class="bg-indigo-700 text-gray-50 p-1 min-w-[35px] max-w-[100px] h-[30px] flex items-center justify-center rounded-l-[5px]"
                :class="{
                  'rounded-r-[5px]': !$roleCheck('patch', route.params.post as string)
                }"
              >
                <p class="truncate">{{ item }}</p>
              </div>
              <button
                class="bg-indigo-300 h-[30px] flex items-center justify-center text-gray-800 px-2 rounded-r-[5px] lg:hover:bg-red-600 lg:hover:text-white duration-200"
                @click="handleRemoveFromArray(field, item)"
                v-if="$roleCheck('patch', route.params.post as string)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button></div
          ></template>
          <div v-else class="flex items-center">
            <div
              class="bg-indigo-700 text-gray-50 p-1 min-w-[35px] max-w-[100px] h-[30px] flex items-center justify-center rounded-l-[5px]"
              :class="{
                'rounded-r-[5px]': !$roleCheck('patch', route.params.post as string)
              }"
            >
              <p class="truncate">{{ localProps.data[field] }}</p>
            </div>
            <button
              class="bg-indigo-300 h-[30px] flex items-center justify-center text-gray-800 px-2 rounded-r-[5px] lg:hover:bg-red-600 lg:hover:text-white duration-200"
              @click="handleRemoveFromField(field)"
              v-if="$roleCheck('patch', route.params.post as string)"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <button
          class="bg-teal-700 h-[30px] aspect-1 rounded-[5px] flex items-center justify-center text-gray-50 text-[24px] lg:hover:bg-teal-500 duration-200"
          :class="{
            'mb-2': $typeCheck(localProps.data[field]) === 'Array'
          }"
          v-if="localProps.schema[field].ref && $roleCheck('patch', route.params.post as string)"
          @click.stop="
            localProps.schema[field].ref &&
              handleRef(
                localProps.schema[field].ref,
                localProps.schema[field].type,
                localProps.data[field],
                field
              )
          "
        >
          <i class="fa-solid fa-up-right-from-square"></i>
        </button>
      </div>
      <div v-if="error[field]" class="text-[12px] text-red-600">
        {{ error[field] }}
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Editor from '@tinymce/tinymce-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlugin } from '@/composables/usePlugins'
import Toggle from './Toggle.vue'

type TProps = {
  schema: any
  data: any
  error: any
  new?: boolean
}

const { user } = useAuth()
const props = defineProps<TProps>()
const emits = defineEmits(['handleRef'])
const route = useRoute()
const localProps = ref<any>(props)
const { $roleCheck, $typeCheck } = usePlugin()

function getEditorInit(item: string) {
  return {
    menubar: false,
    width: '100%',
    height: '350px',
    toolbar:
      'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist',
    setup(editor: any) {
      editor.on('init', () => {
        if (props.data[item]) editor.setContent(props.data[item])
      })
      editor.on('input', () => {
        localProps.value.data[item] = editor.getContent()
      })
    }
  }
}

function handleRef(
  ref: string,
  type: 'text' | 'number' | 'array',
  defaultValue: string | number | string[] | number[],
  key: string
) {
  emits('handleRef', { ref, type, defaultValue, key })
}

function handleRemoveFromArray(field: string, item: string | number) {
  localProps.value.data[field] = (props.data[field] as Array<string | number>).filter(
    (x) => x !== item
  )
}

function handleRemoveFromField(field: string) {
  localProps.value.data[field] = null
}
</script>
