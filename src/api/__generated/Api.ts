import type {Executor} from './';
import {
    AuthenticationService, 
    FaultService, 
    JobService, 
    LoggingService, 
    PermissionService, 
    RoleService, 
    S3Service, 
    SessionHistoryService, 
    SessionService, 
    SystemErrorService, 
    UserService
} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly sessionHistoryService: SessionHistoryService
    
    readonly sessionService: SessionService
    
    readonly systemErrorService: SystemErrorService
    
    readonly faultService: FaultService
    
    readonly jobService: JobService
    
    readonly loggingService: LoggingService
    
    readonly s3service: S3Service
    
    readonly permissionService: PermissionService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.sessionHistoryService = new SessionHistoryService(executor);
        this.sessionService = new SessionService(executor);
        this.systemErrorService = new SystemErrorService(executor);
        this.faultService = new FaultService(executor);
        this.jobService = new JobService(executor);
        this.loggingService = new LoggingService(executor);
        this.s3service = new S3Service(executor);
        this.permissionService = new PermissionService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}