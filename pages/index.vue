<script setup lang="ts">
useSeoMeta({
  title: "Jira Software",
  description: "Nuxt JS Jira clone | @rof1yev",
});
</script>

<template>
  <!-- HERO SECTION start -->
  <section
    class="flex items-center justify-between h-[100vh] pt-[10vh] gap-4 bg-gradient-to-t from-white dark:from-slate-900 to-blue-800 px-10"
  >
    <div>
      <h1 class="text-5xl">
        Move fast, stay aligned, and build better - together
      </h1>
      <p class="text-lg opacity-80">
        The #1 software development tool used by agile teams
      </p>

      <NuxtLink to="/auth">
        <UButton color="blue">Try it free</UButton>
      </NuxtLink>
    </div>
    <NuxtImg src="/hero.webp" />
  </section>
  <!-- HERO SECTION end -->

  <!-- TAB SECTION start -->
  <!-- TAB SECTION end -->
</template>
