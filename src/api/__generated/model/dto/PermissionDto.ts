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
        children?: Array<PermissionDto['PermissionService/LIST']> | undefined;
    }
}
