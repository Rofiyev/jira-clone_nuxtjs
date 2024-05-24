<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

useSeoMeta({
  title: "Authentication | Jira software",
  description: "Authentication | Jira software",
});

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then(() => router.push("/"))
    .catch(() => loadingStore.set(false));
});

const isLogin = ref(true);

const toggleLogin = () => (isLogin.value = !isLogin.value);

const onGoogle = () =>
  ACCOUNT.createOAuth2Session("google", "https://jira-clone-black.vercel.app");

const onGithub = () =>
  ACCOUNT.createOAuth2Session("hithub", "https://jira-clone-black.vercel.app");
</script>

<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <div
    v-else
    class="flex items-center justify-center min-h-[100vh] w-full relative"
  >
    <NuxtImg
      src="/bg-auth.jpg"
      alt="Background Authentication"
      class="absolute inset-0 w-full h-full object-cover z-10 opacity-70"
    />
    <div
      class="absolute inset-0 w-full h-full z-20 dark:bg-black/40 bg-white/20"
    ></div>
    <UCard
      class="z-50 w-3/4 lg:w-1/2 max-w-[900px] relative"
      :ui="{ body: { base: 'md:flex gap-4' } }"
    >
      <div class="space-y-2 flex-1">
        <h1 class="text-2xl font-bold">
          <template v-if="isLogin">Login</template>
          <template v-else>Register</template>
        </h1>

        <p class="opacity-70 text-sm">
          <template v-if="isLogin"
            >Please use the following credentials to login</template
          >
          <template v-else>
            Please use the following credentials to register
          </template>
        </p>

        <AuthLogin v-if="isLogin" :toggle-login="toggleLogin" />
        <AuthRegister v-else :toggle-login="toggleLogin" />
      </div>

      <UDivider
        label="OR"
        orientation="vertical"
        class="w-fit md:flex hidden"
      />
      <UDivider
        label="OR"
        orientation="horizontal"
        class="my-2 md:hidden flex w-full"
      />

      <div class="space-y-4 flex flex-1 flex-col justify-center">
        <UButton color="black" block size="lg" @click="onGithub">
          <Icon name="mdi:github" class="w-5 h-5" />
          <span>Login with Github</span>
        </UButton>
        <UButton color="black" block size="lg" @click="onGoogle">
          <Icon name="ri:google-fill" class="w-5 h-5" />
          <span>Login with Google</span>
        </UButton>
      </div>
    </UCard>
  </div>
</template>
