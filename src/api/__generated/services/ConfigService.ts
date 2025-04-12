import type {Executor} from '../';
import type {ConfigDto, ConfigHistoryDto} from '../model/dto/';
import type {ConfigInput, SaveYamlInput} from '../model/static/';

export class ConfigService {
    
    constructor(private executor: Executor) {}
    
    readonly create: (options: ConfigServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/config';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly delete: (options: ConfigServiceOptions['delete']) => Promise<
        void
    > = async(options) => {
        let _uri = '/config/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly get: (options: ConfigServiceOptions['get']) => Promise<
        ConfigDto['ConfigService/DETAIL']
    > = async(options) => {
        let _uri = '/config/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ConfigDto['ConfigService/DETAIL']>;
    }
    
    readonly list: () => Promise<
        Array<ConfigDto['ConfigService/LIST_ITEM']>
    > = async() => {
        let _uri = '/config';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ConfigDto['ConfigService/LIST_ITEM']>>;
    }
    
    readonly listHistories: (options: ConfigServiceOptions['listHistories']) => Promise<
        Array<ConfigHistoryDto['ConfigService/HISTORY_LIST_ITEM']>
    > = async(options) => {
        let _uri = '/config/';
        _uri += encodeURIComponent(options.id);
        _uri += '/histories';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ConfigHistoryDto['ConfigService/HISTORY_LIST_ITEM']>>;
    }
    
    readonly saveYaml: (options: ConfigServiceOptions['saveYaml']) => Promise<
        void
    > = async(options) => {
        let _uri = '/config/';
        _uri += encodeURIComponent(options.id);
        _uri += '/save-yaml';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Promise<void>;
    }
}

export type ConfigServiceOptions = {
    'list': {}, 
    'create': {
        body: ConfigInput
    }, 
    'saveYaml': {
        id: number, 
        body: SaveYamlInput
    }, 
    'get': {
        id: number
    }, 
    'delete': {
        id: number
    }, 
    'listHistories': {
        id: number
    }
}
