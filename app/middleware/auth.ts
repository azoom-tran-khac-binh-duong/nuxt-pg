export default defineNuxtRouteMiddleware(async (to) => {
  const firebaseUser = await getCurrentUser()
  const { user, fetchAuthUser } = useAuth()
  
  if (!firebaseUser) {
    return navigateTo({
      path: '/account/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }

  if(!user.value) {
    await fetchAuthUser()
  }
})