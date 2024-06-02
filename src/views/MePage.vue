<template>
  <DefaultLayout>
    <div class="h-full flex-col max-h-full space-y-4 xl:w-[70%] w-full mx-auto" v-if="user">
      <div
        class="max-h-[85%] overflow-y-scroll hidden-scrollbar space-y-[1px] !mt-[1px] rounded-b-[10px] rounded-t-[10px] relative"
      >
        <div
          class="p-2 bg-indigo-600 text-gray-100 flex items-center space-x-2 w-max min-w-full sticky top-0 text-[16px]"
        >
          Thông tin cá nhân
        </div>
        <template v-for="(key, index) in Object.keys(schema)" :key="index">
          <RouterLink
            v-if="key !== 'rootUser'"
            :to="{
              name: 'me-field',
              params: {
                field: key
              }
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              @click="navigate"
              class="flex items-center justify-between odd:bg-gray-50 even:bg-gray-200 p-2"
              v-if="!schema[key].disabled"
            >
              <div class="text-gray-900">{{ key }}</div>
              <div
                class="text-indigo-900 font-bold xl:max-w-[250px] md:max-w-[200px] max-w-[140px]"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </a>
            <span
              v-else
              class="flex items-center justify-between odd:bg-gray-50 even:bg-gray-200 p-2"
            >
              <div class="text-gray-900">{{ key }}</div>
              <div class="truncate">{{ user[key as keyof typeof user] }}</div>
            </span>
          </RouterLink>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>
<script setup lang="ts">
import useApi from '@/composables/useApi'
import { useAuth } from '@/composables/useAuth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { stateStore } from '@/stores/getState'
import { ref } from 'vue'

const { user } = useAuth()
const schemaApi = '/schema/user'
const schema = ref()
const store = stateStore()

async function getSchema() {
  store.increaseLoading()
  const result: any = await useApi(schemaApi)
  schema.value = result.data
  store.decreaseLoading()
}

await getSchema()
</script>
