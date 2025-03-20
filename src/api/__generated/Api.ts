import type {Executor} from './';
import {RoleService} from './services/';

export class Api {
    
    readonly roleService: RoleService
    
    constructor(executor: Executor) {
        this.roleService = new RoleService(executor);
    }
}