import type {Executor} from '../';
import type {IssueDto} from '../model/dto/';
import type {IssueInput, IssueSpecification, Page} from '../model/static/';

export class IssueService {
    
    constructor(private executor: Executor) {}
    
    readonly get: (options: IssueServiceOptions['get']) => Promise<
        IssueDto['IssueService/GET']
    > = async(options) => {
        let _uri = '/issues/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<IssueDto['IssueService/GET']>;
    }
    
    readonly list: (options: IssueServiceOptions['list']) => Promise<
        Page<IssueDto['IssueService/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/issues';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.specification.title;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'title='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.description;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'description='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.specification.traceId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'traceId='
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
        _value = options.specification.creatorId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'creatorId='
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Page<IssueDto['IssueService/LIST_ITEM']>>;
    }
    
    readonly report: (options: IssueServiceOptions['report']) => Promise<
        void
    > = async(options) => {
        let _uri = '/issues';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type IssueServiceOptions = {
    'report': {
        body: IssueInput
    }, 
    'get': {
        id: number
    }, 
    'list': {
        pageIndex: number, 
        pageSize: number, 
        specification: IssueSpecification
    }
}
