import type {RequestMethod} from '../enums/';
import type {Dynamic_ApiGroup, Dynamic_Permission} from './';

export interface Dynamic_Api {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    group?: Dynamic_ApiGroup;
    name?: string;
    method?: RequestMethod;
    path?: string;
    permissions?: Array<Dynamic_Permission>;
}
