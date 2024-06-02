<template>
  <Teleport to="body">
    <Modal v-model="showModal" @update:model-value="handleClose">
      <div
        class="space-y-8 2xl:w-[40%] xl:w-[50%] lg:w-[70%] w-[95%] mx-auto max-h-[90%] rounded-[10px] h-fit flex items-center"
      >
        <div
          class="rounded-[10px] lg:max-h-[95vh] max-h-[80vh] overflow-y-scroll hidden-scrollbar relative w-full"
        >
          <div
            class="flex items-center justify-between space-x-2 title !py-2 sticky top-0 z-[1000]"
          >
            <i
              class="fa-solid fa-arrow-left-long cursor-pointer bg-white p-2 rounded-full text-indigo-600 lg:hover:bg-indigo-900 lg:hover:text-white duration-200"
              @click="handleClose"
            ></i>

            <div class="flex items-center space-x-2 h-full">
              <i
                class="fa-solid fa-trash cursor-pointer bg-white p-2 rounded-full text-red-600 lg:hover:bg-red-600 duration-200 h-[36px] aspect-1 flex justify-center items-center lg:hover:text-white"
                @click="deleteConfirmModal = true"
                v-if="data?._id && $roleCheck('delete', route.params.post as string)"
              ></i>
              <i
                class="fa-solid fa-check cursor-pointer bg-white p-2 rounded-full text-teal-600 lg:hover:bg-teal-900 duration-200 h-[36px] aspect-1 flex justify-center items-center lg:hover:text-white"
                @click="handleConfirm"
                v-if="
                  (data._id && $roleCheck('patch', route.params.post as string)) ||
                  (!data._id && $roleCheck('post', route.params.post as string))
                "
              ></i>
            </div>
          </div>
          <div class="p-4 space-y-5 bg-gray-100 max-h-full">
            <RouteItemField
              :schema="schema"
              :data="data"
              :error="error"
              @handleRef="handleRef"
              :new="props.new"
            />
          </div>
        </div>
      </div>
    </Modal>
  </Teleport>

  <Teleport to="body">
    <Modal v-model="deleteConfirmModal">
      <ConfirmModal
        :message="'Bạn có chắc chắn muốn xoá không?'"
        :handle="handleDelete"
        v-model="deleteConfirmModal"
      >
        <template #icon>
          <i class="fa-solid fa-circle-exclamation text-[48px] text-red-600"></i>
        </template>
      </ConfirmModal>
    </Modal>
  </Teleport>

  <Teleport to="body">
    <Modal v-model="selectModal">
      <RouteSelectList
        :refData="refData"
        @close="selectModal = false"
        @confirm="handleSelection"
        v-if="refData"
      />
    </Modal>
  </Teleport>
</template>
<script setup lang="ts">
import useApi from '@/composables/useApi'
import { stateStore } from '@/stores/getState'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlugin } from '@/composables/usePlugins'
import Modal from './Modal.vue'
import ConfirmModal from './ConfirmModal.vue'
import RouteItemField from './RouteItemField.vue'
import RouteSelectList from './RouteSelectList.vue'

type TProps = {
  schema: any
  new?: boolean
}

const route = useRoute()
const props = defineProps<TProps>()
const router = useRouter()
const schema = ref<any>(props.schema)
const data = ref<any>({})
const error = ref<{
  [key: string]: string
}>({})
const deleteConfirmModal = ref(false)
const showModal = ref(false)
const selectModal = ref(false)
const { toastData, isFromInside } = storeToRefs(stateStore())
const refData = ref<{
  ref: string
  type: 'String' | 'Number' | 'Array' | undefined
  defaultValue: string | number | string[] | number[]
  key: string
}>()
const dataApi = ref(`/${route.params.post}`)
const store = stateStore()
const { $roleCheck } = usePlugin()
async function getData() {
  const params = {
    'filter[_id][$eq]': route.params.id
  }
  const result: any = await useApi(dataApi.value, { params })
  data.value = result.data[0]
}

watch(
  () => route.params.post,
  (newVal) => {
    if (newVal) dataApi.value = `/${route.params.post}`
  }
)

watch(
  () => props.schema,
  (newVal) => {
    schema.value = newVal
  }
)

watch(
  () => route.params.id,
  async (newVal) => {
    if (newVal) {
      store.increaseLoading()
      await getData()
      store.decreaseLoading()
      showModal.value = true
    } else showModal.value = false
  },
  { immediate: true }
)

watch(
  () => route.name,
  (newVal) => {
    if (newVal === 'new') showModal.value = true
    else showModal.value = false
  },
  {
    immediate: true
  }
)

if (Object.keys(data.value).length === 0) {
  for (const key in schema.value) {
    if (schema.value[key].default !== undefined) {
      data.value[key] = schema.value[key].default
    } else if (key !== '_id') data.value[key] = ''
  }
}

const isValid = computed(() => {
  for (const [key, value] of Object.entries(schema.value)) {
    if (key === 'password') continue
    if ((value as any).required) {
      if (!data.value[key]) {
        return false
      }
    }
  }
  return true
})

function errorCheck() {
  for (const [key, value] of Object.entries(schema.value)) {
    if ((value as any).required) {
      if (key === 'password') continue
      if (!data.value[key]) {
        error.value[key] = 'Không được để trống!'
      } else error.value[key] = ''
    }
  }
}

async function handleClose() {
  if (route.params.id) data.value = {}
  if (isFromInside.value) {
    router.back()
  } else {
    await router.push({
      name: 'post',
      query: {
        ...route.query
      },
      replace: true
    })
  }
}

async function handleConfirm() {
  errorCheck()
  if (!isValid.value) return
  const result = await useApi(
    `/${route.params.post}${
      route.params.post === 'setting' ? '' : data.value._id ? '/' + data.value._id : ''
    }`,
    {
      method: data.value._id ? 'PATCH' : 'POST',
      body: data.value
    }
  )
  if (result) {
    toastData.value.push({
      message: 'Thành công',
      type: 'success'
    })
    router.back()
  }
}

async function handleDelete() {
  if (!data.value) return
  const result = await useApi(`/${route.params.post}/${data.value._id}`, {
    method: 'DELETE'
  })

  if (result) {
    toastData.value.push({
      message: 'Thành công',
      type: 'success'
    })
    router.back()
  }
}

function handleRef(object: {
  ref: string
  type: 'String' | 'Number' | 'Array' | undefined
  defaultValue: string | number | string[] | number[]
  key: string
}) {
  selectModal.value = true
  let { ref, type, defaultValue, key } = object
  ref = ref.toLowerCase()
  refData.value = {
    ref,
    type,
    defaultValue,
    key
  }
}

function handleSelection({
  selected,
  key
}: {
  selected: { _id: string | number } | { _id: string | number }[]
  key: string
}) {
  if (Array.isArray(selected)) {
    data.value[key] = selected.map((x) => x._id)
  } else data.value[key] = selected._id || null
}
</script>
