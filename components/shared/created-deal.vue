<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";

const state = reactive({
  name: undefined,
  description: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Name is required!" });
  if (!state.description)
    errors.push({ path: "description", message: "Description is required!" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<{}>) {}

const { isPending } = useMutation({});
</script>

<template>
  <UPopover :popper="{ placement: 'right' }">
    <UButton
      variant="ghost"
      class="opacity-75 hover:opacity-100 mx-auto mt-3"
      color="blue"
    >
      <Icon name="radix-icons:plus-circled" size="35" />
    </UButton>

    <template #panel>
      <div class="bg-gray-900 w-80 p-4">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" color="blue" size="lg" />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" color="blue" size="lg" />
          </UFormGroup>

          <UButton
            type="submit"
            color="blue"
            class="w-full"
            block
            size="lg"
            :disabled="isPending"
          >
            <template v-if="isPending">
              <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
            </template>
            <template v-else>Submit</template>
          </UButton></UForm
        >
      </div>
    </template>
  </UPopover>
</template>
