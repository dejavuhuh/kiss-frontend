export interface RoleDto {
  'RoleService/LIST_FETCHER': {
    /**
     * ID
     */
    id: number
    /**
     * 创建时间
     */
    createdAt: string
    /**
     * 角色名称
     */
    name: string
    /**
     * 角色描述
     */
    description?: string | undefined
  }
}
