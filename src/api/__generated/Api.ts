import type {Executor} from './';
import {AuthenticationService, RoleService} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly roleService: RoleService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.roleService = new RoleService(executor);
    }
}