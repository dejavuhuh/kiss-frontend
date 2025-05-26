import type {Executor} from '../';
import type {SessionDto} from '../model/dto/';
import type {SessionSpecification} from '../model/static/';

/**
 * 会话管理
 */
export class SessionService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 强制下线
     */
    readonly kickOut: (options: SessionServiceOptions['kickOut']) => Promise<
        void
    > = async(options) => {
        let _uri = '/sessions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/kickOut';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
    
    /**
     * 查询会话列表
     */
    readonly list: (options: SessionServiceOptions['list']) => Promise<
        Array<SessionDto['SessionService/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/sessions';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
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
        _value = options.specification.displayName;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'displayName='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<SessionDto['SessionService/LIST_ITEM']>>;
    }
}

export type SessionServiceOptions = {
    'list': {
        specification: SessionSpecification
    }, 
    'kickOut': {
        id: number
    }
}
