<script setup lang="ts">
import { useDeals } from "~/query/use-deals";
import { EnumStatus } from "~/types";
import { useCurrentDealStore } from "~/store/current-deal.store";
import { useEditDealStore } from "~/store/edit-deal-store";
import { useDelete } from "~/query/use-delete";

useSeoMeta({
  title: "In Progress | Dashboard",
  description: "Dashboard ~ In Progress | Jira software",
});

definePageMeta({
  layout: "dashboard",
});

const status = ref<string>("in-progress");

const { set } = useCurrentDealStore();
const editDeal = useEditDealStore();
const { data, isLoading, refetch } = useDeals(EnumStatus["in-progress"]);
const { deleteDeal, isDelete } = useDelete(refetch);

const handleDelete = (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete this deal?");
  confirm && deleteDeal(id);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold">In Progress</h1>
    <SharedCreatedDeal :status="status" :refetch="refetch" />
  </div>

  <UDivider class="my-2" />

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
    v-if="isLoading"
  >
    <div
      class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-2 animation"
      v-for="(item, index) in Array.from({ length: 4 })"
      :key="index"
    >
      <USkeleton class="w-10/12 h-4" />
      <USkeleton class="w-full h-1 my-3" />
      <USkeleton class="w-full h-8" />
      <USkeleton class="w-full h-6 mt-3" />
    </div>
  </div>

  <div v-else>
    <div v-if="data?.length">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
      >
        <div
          class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation"
          v-for="item in data"
          :key="item.$id"
          @click="set(item)"
        >
          <div class="flex items-center space-x-2" role="button">
            <span class="font-bold text-lg uppercase">{{ item.name }}</span>
          </div>

          <UDivider class="my-3" />

          <div class="opacity-55 text-sm line-clamp-1">
            {{ item.description }}
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <UButton block color="blue" @click.stop="editDeal.set(item)">
              <IconsEdit />
              Edit
            </UButton>
            <UButton
              block
              color="red"
              @click.stop="handleDelete(item.$id)"
              :disabled="isDelete"
            >
              <IconsTrash />
              Delete
            </UButton>
          </div>
        </div>

        <Slideover />
        <SharedEditDeal :refetch="refetch" />
      </div>
    </div>

    <div v-else>
      <div class="flex flex-col items-center justify-center">
        <NuxtImg src="/no-data.svg" width="300" height="300" />
      </div>
    </div>
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
