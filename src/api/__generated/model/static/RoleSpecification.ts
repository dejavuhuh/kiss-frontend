/**
 * 角色
 */
export interface RoleSpecification {
    /**
     * 角色名称
     */
    readonly name?: string | undefined;
    /**
     * 创建时间
     */
    readonly minCreatedAt?: string | undefined;
    /**
     * 创建时间
     */
    readonly maxCreatedAt?: string | undefined;
}
