import type {Executor} from '../';
import type {Method} from '../model/enums/';

export class MinioService {
    
    constructor(private executor: Executor) {}
    
    readonly getPresignedUrl: (options: MinioServiceOptions['getPresignedUrl']) => Promise<
        string
    > = async(options) => {
        let _uri = '/minio/presignedUrl';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.method;
        _uri += _separator
        _uri += 'method='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.bucket;
        _uri += _separator
        _uri += 'bucket='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.object;
        _uri += _separator
        _uri += 'object='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<string>;
    }
}

export type MinioServiceOptions = {
    'getPresignedUrl': {
        method: Method, 
        bucket: string, 
        object: string
    }
}
