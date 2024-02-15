<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { useLoadingStore } from "~/store/loading.store";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

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
  <section v-else>
    <LayoutsDashboardSidebar />
    <LayoutsDashboardNavbar />
    <main class="min-h-screen bg-white dark:bg-slate-800 pl-72 pt-[10vh]">
      <div class="p-4">
        <slot />
      </div>
    </main>
  </section>
</template>
