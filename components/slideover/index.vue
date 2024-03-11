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
          <div class="flex">
            <NuxtLink to="/" class="flex items-center space-x-1 pl-2">
              <NuxtImg src="/logo.svg" width="40" height="40" />
              <span class="text-xl font-medium">Jira Software</span>
            </NuxtLink>
          </div>
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

      <SlideoverTop />

      <SlideoverComments />
    </UCard>
  </USlideover>
</template>
