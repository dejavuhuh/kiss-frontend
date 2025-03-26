import type {PermissionType} from '../enums/';

export type PermissionDto = {
    'PermissionService/LIST': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        type: PermissionType;
        code: string;
        name: string;
        parentId?: number | undefined;
        roles: Array<{
            /**
             * ID
             */
            id: number;
            /**
             * 角色名称
             */
            name: string;
        }>;
        children?: Array<PermissionDto['PermissionService/LIST']> | undefined;
    }
}
