import type {Executor} from './';
import {
    AuthenticationService, 
    FaultService, 
    JobService, 
    LoggingService, 
    PermissionService, 
    RoleService, 
    SessionHistoryService, 
    SessionService, 
    UserService
} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly sessionHistoryService: SessionHistoryService
    
    readonly sessionService: SessionService
    
    readonly faultService: FaultService
    
    readonly jobService: JobService
    
    readonly loggingService: LoggingService
    
    readonly permissionService: PermissionService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.sessionHistoryService = new SessionHistoryService(executor);
        this.sessionService = new SessionService(executor);
        this.faultService = new FaultService(executor);
        this.jobService = new JobService(executor);
        this.loggingService = new LoggingService(executor);
        this.permissionService = new PermissionService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}