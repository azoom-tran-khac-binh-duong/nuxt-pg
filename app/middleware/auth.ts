export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  
  if (!user) {
    return navigateTo({
      path: '/account/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})