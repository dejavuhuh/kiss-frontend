import type {PermissionType} from '../enums/';

export interface PermissionInput {
    type: PermissionType;
    code: string;
    name: string;
    parentId?: number | undefined;
    roleIds: Array<number>;
}
