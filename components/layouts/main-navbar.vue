<script lang="ts" setup>
import type { ILink } from "~/types/index";
import { useAuthStore } from "~/store/auth.store";

const { currentUser } = useAuthStore();

const navbar_links = ref<ILink[]>([
  { id: 1, name: "Get if free", route: "/auth", variant: "solid" },
  { id: 2, name: "Sign In", route: "/auth", variant: "soft" },
]);
</script>

<template>
  <div
    class="h-[10vh] fixed top-0 right-0 left-0 bg-gray-100 dark:bg-gray-900 z-50 px-2"
  >
    <div class="container mx-auto flex items-center h-full justify-between">
      <NuxtLink to="/" class="flex items-center space-x-1">
        <NuxtImg src="/logo.svg" width="40" height="40" />
        <span class="font-semibold">Jira Software</span>
      </NuxtLink>

      <div class="flex items-center space-x-3">
        <NuxtLink
          class="cursor-pointer"
          to="https://github.com/Rofiyev"
          target="_blank"
        >
          <LogosGithub />
        </NuxtLink>

        <SharedColorMode />

        <template v-if="currentUser.status">
          <SharedUserBox />
        </template>
        <template v-else>
          <NuxtLink
            v-for="link of navbar_links"
            :key="link.id"
            :to="link.route"
            class="hidden md:inline-block"
          >
            <UButton color="blue" :variant="link.variant">{{
              link.name
            }}</UButton>
          </NuxtLink>
          <NuxtLink to="/auth" class="inline-block md:hidden">
            <UButton color="blue" variant="solid">
              <IconsArrow />
            </UButton>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
