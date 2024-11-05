export const useAuth = () => {
  const user = useState('user')

  const fetchAuthUser = async () => {
    const { data } = await useApi('/api/auth/me')
    user.value = data.value!
  }

  return {
    user, 
    fetchAuthUser,
  }
}