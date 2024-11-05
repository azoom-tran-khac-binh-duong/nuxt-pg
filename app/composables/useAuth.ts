import type { User } from "~~/db/schema"

export const useAuth = () => {
  const user = useState<User>('user')

  const fetchAuthUser = async () => {
    const { data } = await useApi<User>('/api/auth/me')
    user.value = data.value!
  }

  return {
    user, 
    fetchAuthUser,
  }
}