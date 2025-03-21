import type {Executor} from '../';
import type {RoleDto} from '../model/dto/';
import type {Page, RoleInput, RoleSpecification} from '../model/static/';

/**
 * 角色服务
 */
export class RoleService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 创建角色
     */
    readonly create: (options: RoleServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/roles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
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
     * 分页查询
     * 
     * @parameter {RoleServiceOptions['list']} options
     * - pageIndex 页码
     * - pageSize 每页大小
     * - specification 查询条件
     */
    readonly list: (options: RoleServiceOptions['list']) => Promise<
        Page<RoleDto['RoleService/LIST_FETCHER']>
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
        _value = options.specification.minCreatedAt;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'minCreatedAt='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.maxCreatedAt;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'maxCreatedAt='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.pageIndex;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'pageIndex='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.pageSize;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'pageSize='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<RoleDto['RoleService/LIST_FETCHER']>>;
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
}

export type RoleServiceOptions = {
    'list': {
        /**
         * 页码
         */
        pageIndex?: number | undefined, 
        /**
         * 每页大小
         */
        pageSize?: number | undefined, 
        /**
         * 查询条件
         */
        specification: RoleSpecification
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
