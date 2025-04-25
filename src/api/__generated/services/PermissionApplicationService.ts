import type {Executor} from '../';
import type {PermissionApplicationInput} from '../model/static/';

export class PermissionApplicationService {
    
    constructor(private executor: Executor) {}
    
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
