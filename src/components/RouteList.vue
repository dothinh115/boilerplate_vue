<template>
  <div class="h-full flex-col max-h-full space-y-4">
    <div
      class="max-h-[85%] overflow-y-scroll hidden-scrollbar space-y-[1px] !mt-[1px] rounded-b-[10px] rounded-t-[10px] relative"
    >
      <div
        class="p-2 bg-indigo-600 text-gray-100 flex items-center space-x-2 w-max min-w-full sticky top-0"
      >
        <RouteListItem :schema="schema" :sortBy="sortBy" @handleSort="handleSort" :width="width" />
      </div>
      <RouteListItem
        v-for="item in data"
        :key="item._id"
        :schema="schema"
        :sortBy="sortBy"
        :item="item"
        :width="width"
      />
      <div
        class="p-2 odd:bg-gray-50 even:bg-gray-200 lg:hover:bg-opacity-90 flex items-center space-x-2 duration-100 last:rounded-b-[10px] w-max min-w-full"
        v-if="data.length === 0"
      >
        {{ isSearching ? 'Không tìm thấy kết quả nào.' : 'Chưa có record nào.' }}
      </div>
    </div>

    <div class="mb-2 flex items-center" v-if="isSearching">
      <div class="py-1 px-2 bg-indigo-100 w-fit rounded-l-[10px]">
        Đang lọc theo trường {{ route.query.field }} với giá trị '{{ route.query.value }}'
      </div>
      <button
        class="py-1 px-2 bg-indigo-300 rounded-r-[10px] lg:cursor-pointer lg:hover:bg-red-600 lg:hover:text-white duration-200"
        @click="clearSearch"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="flex items-center justify-between w-full max-md:flex-wrap max-md:space-y-4">
      <div class="flex space-x-2 items-center text-[14px]">
        <RouterLink
          :to="{
            query: {
              ...route.query,
              page: currentPage - 1
            }
          }"
          custom
          v-slot="{ href, navigate }"
        >
          <a :href="href" @click="navigate" class="paginate" v-if="currentPage !== 1">
            <i class="fa-solid fa-chevron-left"></i
          ></a>
          <span v-else class="paginate opacity-50">
            <i class="fa-solid fa-chevron-left"></i>
          </span>
        </RouterLink>
        <RouterLink
          v-for="(item, index) in pagination"
          :key="index"
          :to="{
            query: {
              ...route.query,
              page: item
            }
          }"
          :class="{
            '!bg-indigo-600 bg-opacity-90 !text-gray-100': item === currentPage,
            paginate: typeof item === 'number',
            'text-gray-100': typeof item !== 'number'
          }"
        >
          {{ item }}
        </RouterLink>

        <RouterLink
          :to="{
            query: {
              ...route.query,
              page: currentPage + 1
            }
          }"
          custom
          v-slot="{ href, navigate }"
        >
          <a :href="href" @click="navigate" class="paginate" v-if="currentPage !== totalPages">
            <i class="fa-solid fa-chevron-right"></i>
          </a>
          <span class="paginate opacity-50" v-else>
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </RouterLink>
      </div>
      <div class="flex space-x-2 items-center max-md:w-full">
        <RouterLink
          :to="{
            name: 'new',
            query: {
              ...route.query
            }
          }"
          class="btn btn-green btn-icon"
          v-if="$roleCheck('post', route.params.post as string)"
        >
          <i class="fa-solid fa-plus"></i><span>Thêm mới</span>
        </RouterLink>
        <button class="btn btn-blue btn-icon" @click="searchModal = true">
          <i class="fa-solid fa-magnifying-glass"></i><span>Tìm kiếm</span>
        </button>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Modal v-model="searchModal">
      <SearchModal
        :schema="schema"
        @close="searchModal = false"
        @searchConfirm="searchConfirm"
        :searching="{
          field: route.query.field as string,
          searchKey: route.query.key as string,
          searchValue: route.query.value as string
        }"
    /></Modal>
  </Teleport>

  <RouteItem :schema="schema" />

  <RouteItem :schema="schema" :new="true" />
</template>
<script setup lang="ts">
import useApi from '@/composables/useApi'
import { stateStore } from '@/stores/getState'
import { storeToRefs } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import usePaginate from '@/composables/usePaginate'
import { usePlugin } from '@/composables/usePlugins'
import Modal from './Modal.vue'
import SearchModal from './SearchModal.vue'
import RouteItem from './RouteItem.vue'
import RouteListItem from './RouteListItem.vue'

type TProps = {
  schemaApi: string
  dataApi: string
}

const props = defineProps<TProps>()
const localProps = ref(props)
const route = useRoute()
const router = useRouter()
const currentPage = ref(Number(route.query.page) || 1)
const perPage = 20
const totalPages = ref(0)
const pagination = ref<(string | number)[]>([])
const { screenWidth } = storeToRefs(stateStore())
const store = stateStore()
const data = ref<any>(null)
const schema = ref<any>()
const sortBy = ref<string>((route.query.sort as string) || '-_id')
const width = ref<{
  [key: string]: number
}>({})
const searchModal = ref(false)
const { $roleCheck, $getMaxLength } = usePlugin()

async function getList() {
  const searchData = route.query
  const { field, key, value } = searchData
  const params = {
    limit: perPage,
    page: currentPage.value,
    meta: '*',
    sort: sortBy.value,
    ...(field &&
      key &&
      value && {
        [`filter[${field}][${key}]`]: value
      })
  }
  const result: any = await useApi(localProps.value.dataApi, { params })
  totalPages.value = Math.ceil(
    (field && key && value ? result.meta.filter_count : result.meta.total_count) / perPage
  )
  data.value = result.data
}

async function getSchema() {
  const result: any = await useApi(localProps.value.schemaApi)
  schema.value = result.data
}

const isSearching = computed(() => route.query.field && route.query.key && route.query.value)

async function searchConfirm(searchData: {
  field: string
  searchKey: string
  searchValue: string
}) {
  const { field, searchKey, searchValue } = searchData
  await router.push({
    query: {
      ...route.query,
      field,
      key: searchKey,
      value: searchValue
    },
    replace: true
  })
  searchModal.value = false
}

async function clearSearch() {
  await router.push({
    query: {
      field: undefined,
      key: undefined,
      value: undefined
    },
    replace: true
  })
  store.increaseLoading()
  await getList()
  store.decreaseLoading()
}

watch(
  () => isSearching.value,
  async (newVal) => {
    if (newVal) {
      store.increaseLoading()
      await getList()
      store.decreaseLoading()
    }
  }
)

watchEffect(() => {
  usePaginate(
    {
      totalPages: totalPages.value || 0,
      currentPage: currentPage.value,
      range: screenWidth.value <= 768 ? 1 : 2
    },
    (paginate: (string | number)[]) => {
      pagination.value = paginate
    }
  )
})

watch(
  () => route.query.page,
  async (newValue) => {
    currentPage.value = Number(newValue)
    if (!route.query.page) currentPage.value = 1
    store.increaseLoading()
    await getList()
    store.decreaseLoading()
  }
)

watch(
  () => route.query.sort,
  (newVal) => {
    if (newVal) sortBy.value = route.query.sort as string
  },
  {
    immediate: true
  }
)

onBeforeRouteUpdate(async (to, from) => {
  if (!to.params.id && from.params.id) {
    store.increaseLoading()
    await getList()
    store.decreaseLoading()
  }
})

function handleSort(key: string) {
  if (!sortBy.value) sortBy.value = '-_id'

  if ((sortBy.value as string).startsWith('-')) {
    router.replace({
      query: {
        ...route.query,
        sort: key
      }
    })
  } else {
    router.replace({
      query: {
        ...route.query,
        sort: sortBy.value === key ? '-' + key : key
      }
    })
  }
}

watch(
  () => route.query.sort,
  async (newVal) => {
    if (newVal) {
      sortBy.value = newVal as string
      await fetchAll()
    }
  }
)

watch(
  () => [localProps.value.schemaApi, localProps.value.dataApi],
  async ([schemaApi, dataApi]) => {
    if (schemaApi || dataApi) {
      await fetchAll()
    }
  }
)

watch(
  () => data.value,
  () => {
    width.value = $getMaxLength({ schema: schema.value, data: data.value })
  }
)

async function fetchAll() {
  store.increaseLoading()
  await getSchema()
  await getList()
  store.decreaseLoading()
}

await fetchAll()
</script>
