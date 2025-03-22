import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function useCurrentUser() {
  const { data } = useQuery({
    queryKey: ['current-user'],
    queryFn: api.authenticationService.getCurrentUser,
  })

  return data
}
