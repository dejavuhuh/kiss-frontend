import type {Executor} from '../';
import type {UserDto} from '../model/dto/';
import type {UserSpecification} from '../model/static/';

export class UserService {
    
    constructor(private executor: Executor) {}
    
    readonly list: (options: UserServiceOptions['list']) => Promise<
        Array<UserDto['UserFetchers/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/users';
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

export type UserServiceOptions = {
    'list': {
        specification: UserSpecification
    }
}
