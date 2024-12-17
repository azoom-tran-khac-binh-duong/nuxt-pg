<template>
  <div class="dashboard-layout">
    <aside class="page-sidebar">
      <nuxt-link
        class="logo"
        to="/"
      >
        Nuxt PG
      </nuxt-link>
      <nav class="nav-list">
        <nuxt-link
          v-for="link in navLinks"
          :key="link.path"
          :active-class="$route.path === link.path ? '-active' : ''"
          class="nav-link"
          :to="link.path"
        >
          {{ link.title }}
        </nuxt-link>
      </nav>
    </aside>
    <main class="page-container">
      <header class="page-header">
        <h1 class="title">
          {{ pageMeta.title }}
        </h1>
        <slot name="header-right" />
      </header>
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const pageMeta = computed(() => useRoute().meta.custom)

const navLinks = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Users', path: '/dashboard/users' }
]
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100%;
}

.page-sidebar {
  min-width: 250px;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-sidebar > .logo {
  font-size: 24px;
  padding: 16px;
  display: flex;
  text-decoration: none;
  color: var(--p-primary-950);
}

.page-sidebar > .nav-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page-sidebar > .nav-list > .nav-link {
  padding: 16px;
  text-decoration: none;
  color: var(--p-primary-950);

  &:hover {
    background-color: var(--p-primary-100);
    cursor: pointer;
  }

  &.-active {
    background-color: var(--p-primary-200);
  }
}

.page-container {
  flex: 1;
}

.page-content {
  padding: 32px;
}

.page-header {
  padding: 16px;
  height: 64px;
  border-bottom: 1px solid #ccc;
}

.page-header > .title {
  font-size: 24px;
  color: var(--p-primary-950);
}
</style>
