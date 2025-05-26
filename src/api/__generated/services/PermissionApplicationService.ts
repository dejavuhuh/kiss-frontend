import type {Executor} from '../';
import type {PermissionApplicationInput} from '../model/static/';

/**
 * 权限申请管理
 */
export class PermissionApplicationService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 发起权限申请
     */
    readonly create: (options: PermissionApplicationServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permission-applications';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type PermissionApplicationServiceOptions = {
    'create': {
        body: PermissionApplicationInput
    }
}
