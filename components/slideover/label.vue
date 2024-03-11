<script lang="ts" setup>
defineProps({
  labelText: { required: true, type: String },
});
</script>

<template>
  <div class="mb-3">
    <label v-if="labelText" class="opacity-75 mb-0.5 block text-sm">{{
      labelText
    }}</label>
    <div class="text-base"><slot /></div>
  </div>
</template>
