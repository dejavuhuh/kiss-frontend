import type {Executor} from './';
import {
    AuthenticationService, 
    JobService, 
    RoleService, 
    UserService
} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly jobService: JobService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.jobService = new JobService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}