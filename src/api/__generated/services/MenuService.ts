import type {Executor} from '../';
import type {
    MenuInput, 
    MenuService_MoveIntoRequest, 
    MenuService_MoveToRequest, 
    MenuView
} from '../model/static/';

export class MenuService {
    
    constructor(private executor: Executor) {}
    
    readonly create: (options: MenuServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/menus';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly deleteByIds: (options: MenuServiceOptions['deleteByIds']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/menus';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.ids.join(',');
        _uri += _separator
        _uri += 'ids='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
    
    readonly findAll: () => Promise<
        Array<MenuView>
    > = async() => {
        let _uri = '/api/menus';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<MenuView>>;
    }
    
    readonly moveInto: (options: MenuServiceOptions['moveInto']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/menus/moveInto';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly moveTo: (options: MenuServiceOptions['moveTo']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/menus/moveTo';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type MenuServiceOptions = {
    'findAll': {}, 
    'create': {
        body: MenuInput
    }, 
    'moveInto': {
        body: MenuService_MoveIntoRequest
    }, 
    'moveTo': {
        body: MenuService_MoveToRequest
    }, 
    'deleteByIds': {
        ids: Array<number>
    }
}
