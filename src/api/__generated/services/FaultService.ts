import type {Executor} from '../';
import type {FaultService_ServerErrorBody} from '../model/static/';

export class FaultService {
    
    constructor(private executor: Executor) {}
    
    /**
     * CPU密集型请求
     */
    readonly cpuIntensive: () => Promise<
        void
    > = async() => {
        let _uri = '/fault/cpu-intensive';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<void>;
    }
    
    /**
     * 模拟高CPU使用率
     */
    readonly highCpu: () => Promise<
        void
    > = async() => {
        let _uri = '/fault/high-cpu';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
    
    /**
     * 服务端异常
     */
    readonly serverError: (options: FaultServiceOptions['serverError']) => Promise<
        void
    > = async(options) => {
        let _uri = '/fault/server-error';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.foo;
        _uri += _separator
        _uri += 'foo='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.bar;
        _uri += _separator
        _uri += 'bar='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type FaultServiceOptions = {
    'highCpu': {}, 
    'cpuIntensive': {}, 
    'serverError': {
        foo: string, 
        bar: number, 
        body: FaultService_ServerErrorBody
    }
}
