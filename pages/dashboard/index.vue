<script lang="ts" setup>
useSeoMeta({
  title: "Dashboard | Jira software",
  description: "Dashboard | Jira software",
});

definePageMeta({
  layout: "dashboard",
});

import { ACCOUNT, DATABASE } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";
import { useStatus } from "~/query/use-status-query";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import type { IColumn, IDeal } from "~/types";
import { useCurrentDealStore } from "~/store/current-deal.store";

const router = useRouter();
const loadingStore = useLoadingStore();
const currentDealStore = useCurrentDealStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => loadingStore.set(false))
    .catch(() => router.push("/auth"));
});

const { data, isLoading, refetch } = useStatus();

const dragCardRef = ref<IDeal | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const isMoving = ref<boolean>(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: ({ docId, status }: { docId: string; status: string }) =>
    DATABASE.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => refetch(),
});

const handleDragStart = (card: IDeal, column: IColumn) => {
  isMoving.value = true;
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const handleDrop = (column: IColumn) => {
  isMoving.value = false;
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.$id, status: column.id });
  }
};
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
    <div
      v-for="column in data"
      :key="column.id"
      @dragover="handleDragOver"
      @drop="() => handleDrop(column)"
      class="px-1"
      :class="
        isMoving &&
        'border-l-2 border-r-2 border-dotted h-screen dark:border-gray-900 border-gray-200'
      "
    >
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
        @dragstart="() => handleDragStart(deal, column)"
        :class="isPending && 'opacity-50 cursor-not-allowed'"
      >
        <div class="flex items-center space-x-2" role="button">
          <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
        </div>

        <UDivider class="my-3" />

        <div class="opacity-55 text-sm line-clamp-1">
          {{ deal.description }}
        </div>

        <UButton
          color="blue"
          class="w-full mt-3 group"
          variant="ghost"
          @click="currentDealStore.set(deal)"
        >
          <span class="font-medium">More details</span>
          <Icon name="" class="group-hover:translate-x-2 transition" />
        </UButton>
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
