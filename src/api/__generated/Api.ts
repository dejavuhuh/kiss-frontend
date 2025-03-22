import type {Executor} from './';
import {AuthenticationService, JobService, RoleService} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly jobService: JobService
    
    readonly roleService: RoleService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.jobService = new JobService(executor);
        this.roleService = new RoleService(executor);
    }
}