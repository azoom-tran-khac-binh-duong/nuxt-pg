export default defineNuxtPlugin(() => {
  const authUser = useCurrentUser()

  const $httpClient = $fetch.create({
    onRequest({ options }) {
      if (authUser.value) {
        // @ts-nocheck
        const { accessToken } = authUser.value.stsTokenManager
        options.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }): any {
      if (response.status === 401) {
        return navigateTo('/account/login')
      }
    },
  })
  
  return {
    provide: {
      httpClient: $httpClient,
    },
  }
})