import type {Executor} from './';
import {
    AuthenticationService, 
    FaultService, 
    JobService, 
    PermissionService, 
    RoleService, 
    SessionService, 
    UserService
} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly sessionService: SessionService
    
    readonly faultService: FaultService
    
    readonly jobService: JobService
    
    readonly permissionService: PermissionService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.sessionService = new SessionService(executor);
        this.faultService = new FaultService(executor);
        this.jobService = new JobService(executor);
        this.permissionService = new PermissionService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}