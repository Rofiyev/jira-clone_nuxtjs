<script setup lang="ts">
const { params } = useRoute();
</script>

<template>
  <div>
    <h1>Posts ID: {{ params.id }}</h1>
  </div>
</template>
