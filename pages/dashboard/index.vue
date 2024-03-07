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
import { useStatus } from "~/query/use-status-query";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => loadingStore.set(false))
    .catch(() => router.push("/auth"));
});

const { data, isLoading, refetch } = useStatus();
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
    <div v-for="column in data" :key="column.id" class="px-1">
      <UButton class="w-full h-12" color="blue" variant="outline">
        <div class="flex items-center space-x-2">
          <span class="font-bold">{{ column.name }}</span>
          <span class="text-sm text-neutral-500">{{
            column.items.length
          }}</span>
        </div>
      </UButton>

      <SharedCreatedDeal :status="column.id" :refetch="refetch" />

      <div
        class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation"
        v-for="deal in column.items"
        :key="deal.$id"
        role="button"
        draggable="true"
      >
        <div class="flex items-center space-x-2" role="button">
          <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
        </div>

        <UDivider class="my-3" />

        <div class="opacity-55 text-sm line-clamp-1">
          {{ deal.description }}
        </div>
      </div>
    </div>

    <Slideover />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>
