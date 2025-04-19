import type {Executor} from '../';
import type {RoleDto, UserDto} from '../model/dto/';
import type {Dynamic_Role} from '../model/dynamic/';
import type {RoleInput, RoleSpecification, UserSpecification} from '../model/static/';

/**
 * 角色服务
 */
export class RoleService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 创建角色
     */
    readonly create: (options: RoleServiceOptions['create']) => Promise<
        Dynamic_Role
    > = async(options) => {
        let _uri = '/roles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<Dynamic_Role>;
    }
    
    /**
     * 删除角色
     * 
     * @parameter {RoleServiceOptions['delete']} options
     * - id 角色ID
     */
    readonly delete: (options: RoleServiceOptions['delete']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    /**
     * 批量删除角色
     * 
     * @parameter {RoleServiceOptions['deleteBatch']} options
     * - ids 角色ID列表
     */
    readonly deleteBatch: (options: RoleServiceOptions['deleteBatch']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.ids;
        for (const _item of _value) {
            _uri += _separator
            _uri += 'ids='
            _uri += encodeURIComponent(_item);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    /**
     * 列表查询
     * 
     * @parameter {RoleServiceOptions['list']} options
     * - specification 查询条件
     * @return 角色列表
     */
    readonly list: (options: RoleServiceOptions['list']) => Promise<
        Array<RoleDto['RoleFetchers/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/roles';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.minCreatedTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'minCreatedTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.maxCreatedTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'maxCreatedTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleDto['RoleFetchers/LIST_ITEM']>>;
    }
    
    readonly options: () => Promise<
        Array<RoleDto['RoleFetchers/SIMPLE']>
    > = async() => {
        let _uri = '/roles/options';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleDto['RoleFetchers/SIMPLE']>>;
    }
    
    /**
     * 更新角色
     * 
     * @parameter {RoleServiceOptions['update']} options
     * - id 角色ID
     */
    readonly update: (options: RoleServiceOptions['update']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
    
    readonly users: (options: RoleServiceOptions['users']) => Promise<
        Array<UserDto['UserFetchers/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/roles/';
        _uri += encodeURIComponent(options.id);
        _uri += '/users';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.username;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'username='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.minCreatedTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'minCreatedTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.maxCreatedTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'maxCreatedTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<UserDto['UserFetchers/LIST_ITEM']>>;
    }
}

export type RoleServiceOptions = {
    'list': {
        /**
         * 查询条件
         */
        specification: RoleSpecification
    }, 
    'options': {}, 
    'users': {
        id: number, 
        specification: UserSpecification
    }, 
    'create': {
        body: RoleInput
    }, 
    'update': {
        /**
         * 角色ID
         */
        id: number, 
        body: RoleInput
    }, 
    'delete': {
        /**
         * 角色ID
         */
        id: number
    }, 
    'deleteBatch': {
        /**
         * 角色ID列表
         */
        ids: Array<number>
    }
}
