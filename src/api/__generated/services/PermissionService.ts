import type {Executor} from '../';
import type {PermissionDto, RoleDto} from '../model/dto/';
import type {PermissionInput} from '../model/static/';

export class PermissionService {
    
    constructor(private executor: Executor) {}
    
    readonly bindRoles: (options: PermissionServiceOptions['bindRoles']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bindRoles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly create: (options: PermissionServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly delete: (options: PermissionServiceOptions['delete']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly list: () => Promise<
        Array<PermissionDto['PermissionFetchers/LIST_ITEM']>
    > = async() => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<PermissionDto['PermissionFetchers/LIST_ITEM']>>;
    }
    
    readonly roles: (options: PermissionServiceOptions['roles']) => Promise<
        Array<RoleDto['RoleFetchers/SIMPLE']>
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/roles';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleDto['RoleFetchers/SIMPLE']>>;
    }
}

export type PermissionServiceOptions = {
    'create': {
        body: PermissionInput
    }, 
    'list': {}, 
    'roles': {
        id: number
    }, 
    'bindRoles': {
        id: number, 
        body: Array<number>
    }, 
    'delete': {
        id: number
    }
}
