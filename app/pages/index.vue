<template>
  <NuxtWelcome />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: false
})
</script>
