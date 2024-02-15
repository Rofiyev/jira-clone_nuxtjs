<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { useLoadingStore } from "@/store/loading.store";
import { ACCOUNT } from "~/libs/appwrite";

const { currentUser, clear } = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

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
      label: "Profile",
      icon: "i-heroicons-cog-8-tooth",
      route: "/profile",
    },
    {
      label: "Dashboard",
      icon: "i-heroicons-book-open",
      route: "/dashboard",
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
