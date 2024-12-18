import { useAzSearchStore } from '@azoom/component-search-3-primevue'
import type { User } from '~~/db/schema'

export const useUserStore = defineStore('user-store', () => {
  const users = ref<User[]>([])
  
  // Init search store
  const userSearchStore = useUserSearchStore()

  // Define search handler
  const fetchUsers = async () => {     
    const { filterValues } = userSearchStore.runtime
    const query = { ...filterValues }

    const { data, error } = await useApi<User[]>('/api/users', {
      query
    })

    if (error.value) {
      console.error(error.value)
      return
    }
    
    users.value = data.value!
  }

  // Config search handler
  userSearchStore.customActions = {
    search: fetchUsers,
  }
  
  return {
    users,
    fetchUsers,
    userSearchStore,
  }
})

function useUserSearchStore() {
  const userSearchStore = useAzSearchStore('user-search-store', {
    persistedState: {
       persist: {
        pick: [
            'preference.histories', 
            'preference.bookmarks', 
            'preference.pinnedFilterNames', 
            'preference.initialized'
        ],
        storage: piniaPluginPersistedstate.localStorage(),
      },
    }
  })
  
  // Define filter categories
  const filterCategory = {
    'default': 'Default',
    'text': 'Text',
    'date': 'Date',
    // add more filter categories here...
  }
  
  // Define filters
  const filters = {
    [filterCategory.text]: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'text',
      },
    ],
    [filterCategory.date]: [
      {
        name: 'createdAt',
        label: 'Created At',
        type: 'dateRange',
        options: { // options for dateRange filter refs to primevue 
          inputDateRange: {
            hidePresets: true,
          },
        }
      },
      {
        name: 'updatedAt',
        label: 'Updated At',
        type: 'dateRange',
        options: {
          inputDateRange: {
            hidePresets: true,
          },
        }
      },
    ],
    // add more filters by category here...
  }
  
  // Specify the pinned filters by name
  const defaultPinnedFilterNames = ['username', 'email']
  
  // Init with the configuration
  userSearchStore.init({
    filters,
    defaultPinnedFilterNames,
    allowEmptyFilters: true,
    // another configuration options will be set by default values
  })
  
  return userSearchStore
}

