<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const user = useCurrentUser()
const { setAuthUser } = useAuth()

watch(user, () => {
  if (user.value) {
    const { data } = useFetch('/api/auth/me')
    setAuthUser(data.value)
  }
})
</script>
