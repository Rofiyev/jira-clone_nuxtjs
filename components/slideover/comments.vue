<script lang="ts" setup></script>

<template>
  <div class="mt-3">Comments</div>
  <UForm class="relative h-12">
    <UFormGroup name="text">
      <UInput size="lg" placeholder="Create a comment..." color="blue" />
    </UFormGroup>
    <div class="absolute top-0 right-0 bottom-0">
      <UButton color="blue" size="lg" type="submit">
        <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
        <Icon name="material-symbols:add" size="20" />
      </UButton>
    </div>
  </UForm>

  <div class="flex items-center space-x-4 mt-8">
    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>

  <div>
    <div class="flex items-start mt-8">
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
      <div
        class="border-border rounded-md w-full dark:bg-gray-800 bg-gray-200 relative px-3 min-h-12"
      >
        <div class="absolute bottom-1 right-2 text-blue-500 text-sm font-bold">
          Rofiyev Dilshod
        </div>
        <p class="pt-3 pb-5">
          programming language is a system of notation for writing computer
          programs.[1] Programming languages are described in terms of their
          syntax (form) and semantics (meaning), usually defined
        </p>
      </div>
    </div>
  </div>
</template>
