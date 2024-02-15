<script lang="ts" setup>
useSeoMeta({
  title: "Dashboard | Jira software",
  description: "Dashboard | Jira software",
});
definePageMeta({
  layout: "dashboard",
});

import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

const router = useRouter();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => loadingStore.set(false))
    .catch(() => router.push("/auth"));
});
</script>

<template>
  <div>Dashboard Main Page</div>
</template>
