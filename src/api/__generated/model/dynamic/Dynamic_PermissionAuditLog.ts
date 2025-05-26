import type {Operation} from '../enums/';
import type {OperationDetails} from '../static/';
import type {Dynamic_Permission, Dynamic_User} from './';

export interface Dynamic_PermissionAuditLog {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    operator?: Dynamic_User;
    permission?: Dynamic_Permission | undefined;
    operation?: Operation;
    operationDetails?: OperationDetails | undefined;
}
