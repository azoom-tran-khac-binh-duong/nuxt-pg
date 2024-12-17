<template>
  <div class="dashboard-user">
    <div class="user-search">
      <az-search :store-id="userSearchStore.$id" />
    </div>
    <div class="user-list">
      <p-data-table
        :value="users"
        striped-rows
        table-style="min-width: 960px"
      >
        <p-column
          field="username"
          header="Username"
        />
        <p-column
          field="email"
          header="Email"
        />
        <p-column
          field="createdAt"
          header="Created At"
        />
        <p-column
          field="updatedAt"
          header="Updated At"
        />
        <template #empty>
          No users found.
        </template>
      </p-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AzSearch } from '@azoom/component-search-3-primevue'
import '@mdi/font/css/materialdesignicons.css'
import '@azoom/component-search-3-primevue/style.css'
import { useUserStore } from '~~/stores/user'

definePageMeta({
  custom: { title: 'Users' }
})

const userStore = useUserStore()

const { users } = storeToRefs(userStore)
const { userSearchStore } = userStore
await userStore.fetchUsers()
</script>

<style scoped>
.user-search {
  margin-bottom: 32px;
}
</style>
