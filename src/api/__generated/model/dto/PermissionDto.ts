import type {PermissionType} from '../enums/';

export type PermissionDto = {
    'PermissionFetchers/LIST_ITEM': {
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
        children?: Array<PermissionDto['PermissionFetchers/LIST_ITEM']> | undefined;
    }
}
