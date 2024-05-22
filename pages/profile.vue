<script setup lang="ts">
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { useLoadingStore } from "~/store/loading.store";

useSeoMeta({
  title: "Profile | Jira Software",
  description: "Nuxt JS Jira clone | @rof1yev",
});

const { currentUser, clear } = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const logout = async () => {
  loadingStore.set(true);
  await ACCOUNT.deleteSession("current");
  clear();
  router.push("/auth");
  loadingStore.set(false);
};
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center px-2">
    <UCard class="w-full md:w-2/4">
      <h1 class="text-3xl font-bold">My Profile</h1>

      <UDivider class="my-2" />

      <div class="h-[300px] flex flex-col justify-between !p-1">
        <div
          class="flex items-center justify-center space-x-3 mt-4 flex-col sm:flex-row"
        >
          <UAvatar :alt="currentUser.name" class="uppercase" size="3xl" />

          <div class="flex flex-col space-y-1 mt-4 sm:mt-0">
            <p class="dark:text-gray-400">
              Name:
              <span class="dark:text-gray-100 font-bold">{{
                currentUser?.name
              }}</span>
            </p>
            <p class="dark:text-gray-400">
              Email:
              <span class="dark:text-gray-100 font-bold">{{
                currentUser?.email
              }}</span>
            </p>
          </div>
        </div>

        <UButton class="w-fit h-9 mt-8" color="red" @click="logout">
          <span class="text-md">Logout</span>
          <Icon name="line-md:logout" size="20" />
        </UButton>
      </div>
    </UCard>
  </div>
</template>
