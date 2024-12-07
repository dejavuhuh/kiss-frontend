import api from '@/api'
import { map } from '@/utils/tree.ts'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useMenuTree() {
  const queryKey = ['/menus']
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey,
    queryFn: api.menuService.findAll,
    select: menus => map(menus, ({ id, children, ...props }) => ({
      ...props,
      key: id,
      value: id,
    })),
  })
  const reload = async () => {
    await queryClient.invalidateQueries({ queryKey })
  }
  return {
    data,
    reload,
  }
}
