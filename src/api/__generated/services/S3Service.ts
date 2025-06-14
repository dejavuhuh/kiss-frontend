import type {Executor} from '../';
import type {Method} from '../model/enums/';
import type {MediaType} from '../model/static/';

/**
 * S3服务
 */
export class S3Service {
    
    constructor(private executor: Executor) {}
    
    /**
     * 获取预签名URL
     */
    readonly preSignedUrl: (options: S3ServiceOptions['preSignedUrl']) => Promise<
        string
    > = async(options) => {
        let _uri = '/s3/preSignedUrl';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.bucket;
        _uri += _separator
        _uri += 'bucket='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.method;
        _uri += _separator
        _uri += 'method='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.objectName;
        _uri += _separator
        _uri += 'objectName='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        _value = options.fileName;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'fileName='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<string>;
    }
}

export type S3ServiceOptions = {
    'preSignedUrl': {
        bucket: string, 
        method: Method, 
        objectName: string, 
        fileName?: string | undefined, 
        contentType?: MediaType | undefined
    }
}
