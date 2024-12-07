import type {Executor} from '../';
import type {
    Page, 
    PageParam, 
    RoleInput, 
    RoleSpecification, 
    RoleView
} from '../model/static/';

export class RoleService {
    
    constructor(private executor: Executor) {}
    
    readonly create: (options: RoleServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/roles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteById: (options: RoleServiceOptions['deleteById']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly findAll: () => Promise<
        Array<RoleView>
    > = async() => {
        let _uri = '/api/roles';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<RoleView>>;
    }
    
    readonly findByPage: (options: RoleServiceOptions['findByPage']) => Promise<
        Page<RoleView>
    > = async(options) => {
        let _uri = '/api/roles/page';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.pageParam.pageIndex;
        _uri += _separator
        _uri += 'pageIndex='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.pageParam.pageSize;
        _uri += _separator
        _uri += 'pageSize='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.specification.name;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'name='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<RoleView>>;
    }
    
    readonly findMenus: (options: RoleServiceOptions['findMenus']) => Promise<
        Array<number>
    > = async(options) => {
        let _uri = '/api/roles/';
        _uri += encodeURIComponent(options.id);
        _uri += '/menus';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<number>>;
    }
    
    readonly saveMenus: (options: RoleServiceOptions['saveMenus']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/roles/';
        _uri += encodeURIComponent(options.id);
        _uri += '/menus';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
    
    readonly update: (options: RoleServiceOptions['update']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/roles/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type RoleServiceOptions = {
    'findByPage': {
        pageParam: PageParam, 
        specification: RoleSpecification
    }, 
    'findAll': {}, 
    'create': {
        body: RoleInput
    }, 
    'update': {
        id: number, 
        body: RoleInput
    }, 
    'deleteById': {
        id: number
    }, 
    'findMenus': {
        id: number
    }, 
    'saveMenus': {
        id: number, 
        body: Array<number>
    }
}
