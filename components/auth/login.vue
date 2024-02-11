<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";
import type { ILoginForm } from "~/types";

defineProps({
  toggleLogin: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const isLoading = ref(false);
const error = ref("");

const state = reactive<ILoginForm>({
  email: "",
  password: "",
});

const validate = (state: ILoginForm): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email is required!" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required!" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<ILoginForm>) {
  isLoading.value = true;
  const { email, password } = event.data;

  try {
    await ACCOUNT.createEmailSession(email, password);
    const { email: emailAcc, $id, status, name } = await ACCOUNT.get();
    authStore.set({ email: emailAcc, id: $id, name, status });

    toast.add({
      title: "Logged in",
      description: "You are now logged in",
    });
    await router.push("/");
  } catch (e: any) {
    error.value = e.message;
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UAlert
    icon="i-heroicons-command-line"
    :description="error"
    title="Error"
    v-if="error"
    color="red"
    variant="outline"
  />
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" color="blue" size="lg" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" size="lg" />
    </UFormGroup>

    <div class="text-sm text-neutral-500">
      Not registered yet?
      <span
        class="text-blue-500 hover:underline cursor-pointer"
        @click="$props.toggleLogin"
        >Sign Up</span
      >
    </div>

    <UButton
      :disabled="isLoading"
      type="submit"
      color="blue"
      class="w-full block"
      size="lg"
    >
      <template v-if="isLoading">
        <Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
      </template>
      <template v-else>Submit</template>
    </UButton>
  </UForm>
</template>
