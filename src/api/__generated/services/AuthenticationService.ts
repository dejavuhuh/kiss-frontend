import type {Executor} from '../';
import type {UserDto} from '../model/dto/';
import type {AuthenticationService_SignInRequest} from '../model/static/';

export class AuthenticationService {
    
    constructor(private executor: Executor) {}
    
    readonly applyForPermissions: () => Promise<
        void
    > = async() => {
        let _uri = '/apply-for-permissions';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
    
    readonly getCurrentUser: () => Promise<
        UserDto['AuthenticationService/CURRENT_USER']
    > = async() => {
        let _uri = '/current-user';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<UserDto['AuthenticationService/CURRENT_USER']>;
    }
    
    readonly signIn: (options: AuthenticationServiceOptions['signIn']) => Promise<
        string
    > = async(options) => {
        let _uri = '/sign-in';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<string>;
    }
    
    readonly signOut: () => Promise<
        void
    > = async() => {
        let _uri = '/sign-out';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
    
    readonly signUp: (options: AuthenticationServiceOptions['signUp']) => Promise<
        void
    > = async(options) => {
        let _uri = '/sign-up';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type AuthenticationServiceOptions = {
    'signIn': {
        body: AuthenticationService_SignInRequest
    }, 
    'signUp': {
        body: AuthenticationService_SignInRequest
    }, 
    'signOut': {}, 
    'getCurrentUser': {}, 
    'applyForPermissions': {}
}
