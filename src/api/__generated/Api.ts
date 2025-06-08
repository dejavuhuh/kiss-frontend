import type {Executor} from './';
import {
    AuthenticationService, 
    BigDataService, 
    ConfigService, 
    FaultService, 
    FeishuService, 
    IssueService, 
    JobService, 
    LoggingService, 
    PermissionApplicationService, 
    PermissionService, 
    ProductCategoryService, 
    RechargeService, 
    RoleService, 
    S3Service, 
    SessionHistoryService, 
    SessionService, 
    SubscriptionPlanService, 
    UserService
} from './services/';

export class Api {
    
    readonly permissionApplicationService: PermissionApplicationService
    
    readonly authenticationService: AuthenticationService
    
    readonly sessionHistoryService: SessionHistoryService
    
    readonly sessionService: SessionService
    
    readonly productCategoryService: ProductCategoryService
    
    readonly bigDataService: BigDataService
    
    readonly faultService: FaultService
    
    readonly feishuService: FeishuService
    
    readonly issueService: IssueService
    
    readonly jobService: JobService
    
    readonly loggingService: LoggingService
    
    readonly rechargeService: RechargeService
    
    readonly subscriptionPlanService: SubscriptionPlanService
    
    readonly s3service: S3Service
    
    readonly configService: ConfigService
    
    readonly permissionService: PermissionService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    constructor(executor: Executor) {
        this.permissionApplicationService = new PermissionApplicationService(executor);
        this.authenticationService = new AuthenticationService(executor);
        this.sessionHistoryService = new SessionHistoryService(executor);
        this.sessionService = new SessionService(executor);
        this.productCategoryService = new ProductCategoryService(executor);
        this.bigDataService = new BigDataService(executor);
        this.faultService = new FaultService(executor);
        this.feishuService = new FeishuService(executor);
        this.issueService = new IssueService(executor);
        this.jobService = new JobService(executor);
        this.loggingService = new LoggingService(executor);
        this.rechargeService = new RechargeService(executor);
        this.subscriptionPlanService = new SubscriptionPlanService(executor);
        this.s3service = new S3Service(executor);
        this.configService = new ConfigService(executor);
        this.permissionService = new PermissionService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
    }
}