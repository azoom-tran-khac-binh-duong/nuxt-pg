<template>
  <NuxtWelcome />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
