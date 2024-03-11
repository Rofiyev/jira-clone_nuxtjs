<script setup lang="ts">
import { useCurrentDealStore } from "~/store/current-deal.store";

const store = useCurrentDealStore();

const isOpen = computed({
  get: () => store.isOpen,
  set: (value: boolean) => (store.isOpen = value),
});
</script>

<template>
  <USlideover v-model="isOpen" prevent-close>
    <UCard
      class="flex flex-col flex-1 overflow-y-auto rounded-none"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Slideover
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <Placeholder class="h-full" />
    </UCard>
  </USlideover>
</template>
