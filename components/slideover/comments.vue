<script lang="ts" setup>
import dayjs from "dayjs";
import { useComments } from "~/query/use-comments";
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";
import { DATABASE, UNIQUE_ID } from "~/libs/appwrite";
import { COLLECTION_COMMENTS, DB_ID } from "~/constants";
import { useCurrentDealStore } from "~/store/current-deal.store";

const { deal } = useCurrentDealStore();
const toast = useToast();

const { data, refetch, isLoading } = useComments();
console.log(data);

const { mutate, isPending } = useMutation({
  mutationKey: ["create-comment"],
  mutationFn: ({ text }: { text: string }) =>
    DATABASE.createDocument(DB_ID, COLLECTION_COMMENTS, UNIQUE_ID, {
      text,
      deal: deal?.$id,
    }),
  onSuccess() {
    refetch();
    state.text = undefined;
    toast.add({
      title: "Comment added",
      description: "Your comment has been added successfully",
    });
  },
  onError(error) {
    toast.add({ title: "ERROR", description: error.message, color: "red" });
  },
});

const state = reactive({
  text: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.text) errors.push({ path: "text", message: "Write your comment" });
  return errors;
};

const onSubmit = ({ data }: FormSubmitEvent<any>) =>
  mutate({ text: data.text });
</script>

<template>
  <div class="mt-3">Comments</div>
  <UForm
    :validate="validate"
    :state="state"
    @submit="onSubmit"
    class="relative h-12"
  >
    <UFormGroup name="text">
      <UInput
        v-model="state.text"
        size="lg"
        placeholder="Create a comment..."
        color="blue"
      />
    </UFormGroup>
    <div class="absolute top-0 right-0 bottom-0">
      <UButton color="blue" size="lg" type="submit">
        <template v-if="isPending">
          <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
        </template>
        <template v-else>
          <Icon name="material-symbols:add" size="20" />
        </template>
      </UButton>
    </div>
  </UForm>

  <div v-if="isLoading" class="flex items-center space-x-4 mt-8">
    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>

  <div v-else-if="data">
    <div v-for="item in data" :key="item.$id" class="flex items-start mt-8">
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
      <div
        class="border-border rounded-md w-full dark:bg-gray-800 bg-gray-200 relative px-3 min-h-12"
      >
        <div class="absolute bottom-1 right-2 text-blue-500 text-sm font-bold">
          {{ dayjs(item.$createdAt).format("HH:mm") }}
        </div>
        <p class="pt-3 pb-5">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>
