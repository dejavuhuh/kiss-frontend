import type {PermissionType} from '../enums/';
import type {Dynamic_Role} from './';

export interface Dynamic_Permission {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    type?: PermissionType;
    code?: string;
    name?: string;
    parent?: Dynamic_Permission | undefined;
    parentId?: number | undefined;
    children?: Array<Dynamic_Permission>;
    roles?: Array<Dynamic_Role>;
    roleIds?: Array<number>;
}
