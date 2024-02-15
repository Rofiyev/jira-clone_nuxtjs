<script lang="ts" setup>
import { useLoadingStore } from "~/store/loading.store";

const { isLoading } = useLoadingStore();
</script>

<template>
  <LayoutsMainNavbar v-if="!isLoading" />
  <section>
    <slot />
  </section>
</template>
