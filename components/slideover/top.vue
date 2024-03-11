<script lang="ts" setup>
import { useCurrentDealStore } from "~/store/current-deal.store";

const store = useCurrentDealStore();
</script>

<template>
  <div class="rounded p-4 bg-gray-800">
    <div class="uppercase bold text-xl mb-5 font-medium">About deal</div>

    <SlideoverLabel label-text="Name"> {{ store.deal?.name }} </SlideoverLabel>

    <SlideoverLabel label-text="Status"
      ><UBadge color="blue" class="font-bold">{{ store.deal?.status }}</UBadge>
    </SlideoverLabel>
  </div>
</template>
