import type {Executor} from './';
import {
    AuthenticationService, 
    ConfigService, 
    FaultService, 
    IssueService, 
    JobService, 
    LoggingService, 
    PermissionService, 
    RoleService, 
    S3Service, 
    SessionHistoryService, 
    SessionService, 
    UserService
} from './services/';

export class Api {
    
    readonly authenticationService: AuthenticationService
    
    readonly sessionHistoryService: SessionHistoryService
    
    readonly sessionService: SessionService
    
    readonly faultService: FaultService
    
    readonly issueService: IssueService
    
    readonly jobService: JobService
    
    readonly loggingService: LoggingService
    
    readonly s3service: S3Service
    
    readonly configService: ConfigService
    
    readonly permissionService: PermissionService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.authenticationService = new AuthenticationService(executor);
        this.sessionHistoryService = new SessionHistoryService(executor);
        this.sessionService = new SessionService(executor);
        this.faultService = new FaultService(executor);
        this.issueService = new IssueService(executor);
        this.jobService = new JobService(executor);
        this.loggingService = new LoggingService(executor);
        this.s3service = new S3Service(executor);
        this.configService = new ConfigService(executor);
        this.permissionService = new PermissionService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}