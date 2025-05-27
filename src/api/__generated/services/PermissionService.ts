import type {Executor} from '../';
import type {ApiDto, PermissionDto, RoleDto} from '../model/dto/';
import type {Dynamic_Permission} from '../model/dynamic/';
import type {PermissionInput} from '../model/static/';

/**
 * 权限管理
 */
export class PermissionService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 绑定角色
     */
    readonly bindRoles: (options: PermissionServiceOptions['bindRoles']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bindRoles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    /**
     * 查询已绑定的接口
     */
    readonly boundApis: (options: PermissionServiceOptions['boundApis']) => Promise<
        Array<ApiDto['PermissionFetchers/API_LIST_ITEM']>
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bound-apis';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ApiDto['PermissionFetchers/API_LIST_ITEM']>>;
    }
    
    /**
     * 创建权限
     */
    readonly create: (options: PermissionServiceOptions['create']) => Promise<
        Dynamic_Permission
    > = async(options) => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Dynamic_Permission>;
    }
    
    /**
     * 删除权限
     */
    readonly delete: (options: PermissionServiceOptions['delete']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    /**
     * 查询权限树
     */
    readonly list: () => Promise<
        Array<PermissionDto['PermissionFetchers/LIST_ITEM']>
    > = async() => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<PermissionDto['PermissionFetchers/LIST_ITEM']>>;
    }
    
    /**
     * 查询权限关联的角色
     */
    readonly roles: (options: PermissionServiceOptions['roles']) => Promise<
        Array<RoleDto['RoleFetchers/SIMPLE']>
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/roles';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleDto['RoleFetchers/SIMPLE']>>;
    }
    
    /**
     * 移除已绑定的接口
     */
    readonly unbindApi: (options: PermissionServiceOptions['unbindApi']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bound-apis/';
        _uri += encodeURIComponent(options.apiId);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    /**
     * 查询未绑定的接口
     */
    readonly unboundApis: (options: PermissionServiceOptions['unboundApis']) => Promise<
        Array<ApiDto['PermissionFetchers/API_LIST_ITEM']>
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/unbound-apis';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ApiDto['PermissionFetchers/API_LIST_ITEM']>>;
    }
    
    /**
     * 更新权限
     */
    readonly update: (options: PermissionServiceOptions['update']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type PermissionServiceOptions = {
    'create': {
        body: PermissionInput
    }, 
    'update': {
        id: number, 
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
    }, 
    'unboundApis': {
        id: number
    }, 
    'boundApis': {
        id: number
    }, 
    'unbindApi': {
        id: number, 
        apiId: number
    }
}
