<script lang="ts" setup>
import type { ILink } from "~/types/index";
import { useAuthStore } from "~/store/auth.store";
import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

const router = useRouter();
const { currentUser, clear } = useAuthStore();
const loadingStore = useLoadingStore();

const profileDetails = ref([
  [
    {
      label: currentUser.status ? currentUser.name : "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      route: "/settings",
    },
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
      route: "/documentation",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      route: "/logout",
    },
  ],
]);

watch(currentUser, (newVal) => {
  if (newVal.status) {
    profileDetails.value[0][0].label = newVal.name;
  }
});

const navbar_links = ref<ILink[]>([
  { id: 1, name: "Get if free", route: "/auth", variant: "solid" },
  { id: 2, name: "Sign In", route: "/auth", variant: "soft" },
]);

const handleRoute = async (route: string) => {
  loadingStore.isLoading = true;

  if (route === "/logout") {
    await ACCOUNT.deleteSession("current");
    await router.push("/auth");
    clear();
  } else router.push(route);

  loadingStore.isLoading = false;
};
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
          <UDropdown
            :items="profileDetails"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }"
          >
            <UAvatar
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            />

            <template #account="{ item }">
              <div class="text-left">
                <p>Signed in as</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #item="{ item }">
              <span
                @click="handleRoute(item.route)"
                class="truncate flex items-center justify-between w-full"
              >
                {{ item.label }}
                <UIcon
                  :name="item.icon"
                  class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                />
              </span>
            </template>
          </UDropdown>
        </template>
        <template v-else>
          <NuxtLink
            v-for="link of navbar_links"
            :key="link.id"
            :to="link.route"
          >
            <UButton color="blue" :variant="link.variant">{{
              link.name
            }}</UButton>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
