import type {Dynamic_Api} from './';

export interface Dynamic_ApiGroup {
    /**
     * ID
     */
    id?: number;
    /**
     * 创建时间
     */
    createdTime?: string;
    name?: string;
    apis?: Array<Dynamic_Api>;
}
