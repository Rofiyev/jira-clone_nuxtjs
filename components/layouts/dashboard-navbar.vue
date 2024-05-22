<script lang="ts" setup>
const { toggleOpen } = defineProps({
  toggleOpen: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 h-[10vh] dark:bg-gray-900 bg-gray-200 !w-full pl-0 xl:pl-72 flex items-center justify-between xl:justify-end"
  >
    <UButton
      @click="() => toggleOpen()"
      label="Button"
      color="gray"
      class="inline-block xl:hidden ml-4"
    >
      <IconsBars />
    </UButton>

    <div class="flex items-center space-x-2">
      <SharedColorMode />
      <SharedUserBox />
    </div>
  </div>
</template>
