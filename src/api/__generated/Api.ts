import type {Executor} from './';
import {
    AuthenticationService, 
    MenuService, 
    MinioService, 
    RestErrorController, 
    RoleService, 
    UserService
} from './services/';

export class Api {
    
    readonly restErrorController: RestErrorController
    
    readonly minioService: MinioService
    
    readonly menuService: MenuService
    
    readonly roleService: RoleService
    
    readonly userService: UserService
    
    readonly authenticationService: AuthenticationService
    
    constructor(executor: Executor) {
        this.restErrorController = new RestErrorController(executor);
        this.minioService = new MinioService(executor);
        this.menuService = new MenuService(executor);
        this.roleService = new RoleService(executor);
        this.userService = new UserService(executor);
        this.authenticationService = new AuthenticationService(executor);
    }
}