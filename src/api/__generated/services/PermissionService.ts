import type {Executor} from '../';
import type {PermissionDto, RoleDto} from '../model/dto/';
import type {PermissionInput} from '../model/static/';

export class PermissionService {
    
    constructor(private executor: Executor) {}
    
    readonly bindableRoles: (options: PermissionServiceOptions['bindableRoles']) => Promise<
        Array<RoleDto['PermissionService/BINDABLE_ROLE']>
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bindableRoles';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleDto['PermissionService/BINDABLE_ROLE']>>;
    }
    
    readonly create: (options: PermissionServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly list: () => Promise<
        Array<PermissionDto['PermissionService/LIST']>
    > = async() => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<PermissionDto['PermissionService/LIST']>>;
    }
}

export type PermissionServiceOptions = {
    'create': {
        body: PermissionInput
    }, 
    'list': {}, 
    'bindableRoles': {
        id: number
    }
}
