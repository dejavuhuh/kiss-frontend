import type {Executor} from '../';
import type {PermissionDto} from '../model/dto/';
import type {PermissionInput} from '../model/static/';

export class PermissionService {
    
    constructor(private executor: Executor) {}
    
    readonly bindRoles: (options: PermissionServiceOptions['bindRoles']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        _uri += '/bindRoles';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly create: (options: PermissionServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly delete: (options: PermissionServiceOptions['delete']) => Promise<
        void
    > = async(options) => {
        let _uri = '/permissions/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly list: () => Promise<
        Array<PermissionDto['PermissionService/LIST']>
    > = async() => {
        let _uri = '/permissions';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<PermissionDto['PermissionService/LIST']>>;
    }
}

export type PermissionServiceOptions = {
    'create': {
        body: PermissionInput
    }, 
    'list': {}, 
    'bindRoles': {
        id: number, 
        body: Array<number>
    }, 
    'delete': {
        id: number
    }
}
