<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";

const { currentUser } = useAuthStore();
</script>

<template>
  <LayoutsMainNavbar v-if="!currentUser.status" />
  <section>
    <slot />
  </section>
</template>
