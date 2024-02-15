<script lang="ts" setup>
useSeoMeta({
  title: "Dashboard | Jira software",
  description: "Dashboard | Jira software",
});
definePageMeta({
  layout: "dashboard",
});

import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";
import { useStatusQuery } from "~/query/use-status-query";

const router = useRouter();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => loadingStore.set(false))
    .catch(() => router.push("/auth"));
});

const { data, isLoading } = useStatusQuery();
console.log(data);
</script>

<template>
  <div class="grid grid-cols-4 gap-2 mt-12" v-if="isLoading">
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />
    <USkeleton class="h-12 dark:bg-gray-900 bg-gray-100" />

    <UiDealsLoader />
    <UiDealsLoader />
    <UiDealsLoader />
    <UiDealsLoader />
  </div>
  <div class="grid grid-cols-4 gap-2 mt-12" v-else>
    <div v-for="item in data" :key="item.id">
      <UButton class="w-full h-12" color="blue" variant="outline">
        <div class="flex items-center space-x-2">
          <span class="font-bold">{{ item.name }}</span>
          <div class="text-sm text-neutral-500">{{ item.items.length }}</div>
        </div>
      </UButton>

      <SharedCreatedDeal />

      <div
        class="my-3 dark:bg-gray-900 bg-gray-200 rounded-md p-2"
        v-for="card in item.items"
        :key="card.$id"
        draggable="true"
      >
        <div class="flex items-center space-x-2">
          <div class="font-bold text-lg uppercase">{{ card.name }}</div>
        </div>

        <UDivider class="my-3" />

        <div class="opacity-55 text-sm line-clamp-3">
          {{ card.description }}
        </div>
      </div>
    </div>
  </div>
</template>
