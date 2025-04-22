import type {Executor} from '../';

export class FeishuService {
    
    constructor(private executor: Executor) {}
    
    readonly authorize: (options: FeishuServiceOptions['authorize']) => Promise<
        void
    > = async(options) => {
        let _uri = '/feishu/authorize';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.code;
        _uri += _separator
        _uri += 'code='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.redirectUri;
        _uri += _separator
        _uri += 'redirectUri='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
}

export type FeishuServiceOptions = {
    'authorize': {
        code: string, 
        redirectUri: string
    }
}
