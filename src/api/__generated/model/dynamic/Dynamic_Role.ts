import type {Dynamic_Permission, Dynamic_User} from './';

/**
 * 角色
 */
export interface Dynamic_Role {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    creator?: Dynamic_User;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 角色描述
     */
    description?: string | undefined;
    permissions?: Array<Dynamic_Permission>;
    permissionIds?: Array<number>;
    users?: Array<Dynamic_User>;
    userIds?: Array<number>;
}
