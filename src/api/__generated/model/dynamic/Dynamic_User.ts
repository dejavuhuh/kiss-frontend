import type {Dynamic_Role} from './';

export interface Dynamic_User {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    displayName?: string;
    roles?: Array<Dynamic_Role>;
    roleIds?: Array<number>;
}
