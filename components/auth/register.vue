<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import type { IRegisterForm } from "~/types";
import { ACCOUNT, UNIQUE_ID } from "~/libs/appwrite";

defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const state = reactive<IRegisterForm>({
  name: "",
  email: "",
  password: "",
});

const validate = (state: IRegisterForm): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Name is required!" });
  if (!state.email)
    errors.push({ path: "email", message: "Email is required!" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required!" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<IRegisterForm>) {
  const { name, email, password } = event.data;

  try {
    const response = await ACCOUNT.create(UNIQUE_ID, email, password, name);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" color="blue" size="lg" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" color="blue" size="lg" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" size="lg" />
    </UFormGroup>

    <div class="text-sm text-neutral-500">
      Already have an account?
      <span
        class="text-blue-500 hover:underline cursor-pointer"
        @click="$props.toggleLogin"
        >Sign In</span
      >
    </div>

    <UButton type="submit" color="blue" class="w-full block" size="lg">
      Submit
    </UButton>
  </UForm>
</template>