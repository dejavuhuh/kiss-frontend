import type {Executor} from '../';
import type {AuthenticationService_LoginRequest, JdbcUserDetails} from '../model/static/';

export class AuthenticationService {
    
    constructor(private executor: Executor) {}
    
    readonly getCurrentUser: () => Promise<
        JdbcUserDetails
    > = async() => {
        let _uri = '/api/authentication';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<JdbcUserDetails>;
    }
    
    readonly login: (options: AuthenticationServiceOptions['login']) => Promise<
        void
    > = async(options) => {
        let _uri = '/api/authentication';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly logout: () => Promise<
        void
    > = async() => {
        let _uri = '/api/authentication';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Promise<void>;
    }
}

export type AuthenticationServiceOptions = {
    'getCurrentUser': {}, 
    'login': {
        body: AuthenticationService_LoginRequest
    }, 
    'logout': {}
}
