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
    username?: string;
    password?: string;
    roles?: Array<Dynamic_Role>;
}
