import type {Executor} from '../';
import type {
    Page, 
    PageParam, 
    UserInput, 
    UserSpecification, 
    UserView
} from '../model/static/';

export class UserService {
    
    constructor(private executor: Executor) {}
    
    readonly create: (options: UserServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/users';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteById: (options: UserServiceOptions['deleteById']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/users/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly findByPage: (options: UserServiceOptions['findByPage']) => Promise<
        Page<UserView>
    > = async(options) => {
        let _uri = '/api/users';
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
        _value = options.specification.username;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'username='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.roleIds?.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'roleIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<UserView>>;
    }
    
    readonly update: (options: UserServiceOptions['update']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/users/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type UserServiceOptions = {
    'findByPage': {
        pageParam: PageParam, 
        specification: UserSpecification
    }, 
    'create': {
        body: UserInput
    }, 
    'update': {
        id: number, 
        body: UserInput
    }, 
    'deleteById': {
        id: number
    }
}
