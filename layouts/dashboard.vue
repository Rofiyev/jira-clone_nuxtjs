<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { useLoadingStore } from "~/store/loading.store";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const isOpen = ref<boolean>(false);

const toggleOpen = () => (isOpen.value = !isOpen.value);

onMounted(() => {
  loadingStore.set(true);

  ACCOUNT.get()
    .then((response) =>
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      })
    )
    .catch(() => router.push("/auth"))
    .finally(() => loadingStore.set(false));
});
</script>

<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <section class="w-full" v-else>
    <div class="hidden xl:block">
      <LayoutsDashboardSidebar :toggle-open="toggleOpen" />
    </div>
    <USlideover
      class="w-72 block xl:hidden"
      side="left"
      transition
      overlay
      v-model="isOpen"
    >
      <LayoutsDashboardSidebar :toggle-open="toggleOpen" />
    </USlideover>

    <LayoutsDashboardNavbar :toggle-open="toggleOpen" />
    <main
      class="min-h-screen bg-white dark:bg-slate-800 pl-0 xl:pl-72 pt-[10vh] !w-full"
    >
      <div class="p-4">
        <slot />
      </div>
    </main>
  </section>
</template>
