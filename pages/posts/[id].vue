<script setup lang="ts">
const { params } = useRoute();
definePageMeta({});
useSeoMeta({ title: `Post ID: ${params.id}` });
</script>

<template>
  <div>
    <h1>Posts ID: {{ params.id }}</h1>
  </div>
</template>
