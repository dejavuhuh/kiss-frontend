import type {Executor} from '../';

export class BigDataService {
    
    constructor(private executor: Executor) {}
    
    readonly createExportTask: () => Promise<
        number
    > = async() => {
        let _uri = '/export/demo/big-data/export-task';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<number>;
    }
    
    readonly generate: (options: BigDataServiceOptions['generate']) => Promise<
        void
    > = async(options) => {
        let _uri = '/export/demo/big-data/generate';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.count;
        _uri += _separator
        _uri += 'count='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
}

export type BigDataServiceOptions = {
    'generate': {
        count: number
    }, 
    'createExportTask': {}
}
