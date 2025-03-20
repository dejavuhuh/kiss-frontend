/**
 * 角色
 */
export interface RoleInput {
    /**
     * 角色名称
     */
    readonly name: string;
    /**
     * 角色描述
     */
    readonly description?: string | undefined;
}
