<script lang="ts" setup>
import type { ILink } from "../../types/index";

const navbar_links = ref<ILink[]>([
  { id: 1, name: "Get if free", route: "/auth", variant: "solid" },
  { id: 2, name: "Sign In", route: "/auth", variant: "soft" },
]);
</script>

<template>
  <div
    class="h-[10vh] fixed top-0 right-0 left-0 bg-gray-100 dark:bg-gray-900 z-50"
  >
    <div class="container mx-auto flex items-center h-full justify-between">
      <NuxtLink to="/" class="flex items-center space-x-1">
        <NuxtImg src="/logo.svg" width="40" height="40" />
        <span class="font-semibold">Jira Software</span>
      </NuxtLink>

      <div class="flex items-center space-x-2">
        <NuxtLink v-for="link of navbar_links" :key="link.id" :to="link.route">
          <UButton color="blue" :variant="link.variant">{{
            link.name
          }}</UButton>
        </NuxtLink>

        <SharedColorMode />

        <NuxtLink
          class="cursor-pointer"
          to="https://github.com/Rofiyev"
          target="_blank"
        >
          <LogosGithub />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
