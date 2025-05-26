import type {Executor} from '../';
import type {Dynamic_SessionHistory} from '../model/dynamic/';
import type {Page, SessionHistorySpecification} from '../model/static/';

/**
 * 历史会话管理
 */
export class SessionHistoryService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 查询历史会话
     */
    readonly list: (options: SessionHistoryServiceOptions['list']) => Promise<
        Page<Dynamic_SessionHistory>
    > = async(options) => {
        let _uri = '/session-histories';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.reason;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'reason='
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
        _value = options.pageIndex;
        _uri += _separator
        _uri += 'pageIndex='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.pageSize;
        _uri += _separator
        _uri += 'pageSize='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<Dynamic_SessionHistory>>;
    }
}

export type SessionHistoryServiceOptions = {
    'list': {
        pageIndex: number, 
        pageSize: number, 
        specification: SessionHistorySpecification
    }
}
