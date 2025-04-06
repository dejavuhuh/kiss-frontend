import type {HttpRequest} from '../static/';

export type IssueDto = {
    'IssueService/GET': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        request: HttpRequest;
        traceId: string;
        title: string;
        description: string;
        creator: {
            /**
             * ID
             */
            id: number;
            username: string;
        };
    }, 
    'IssueService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        title: string;
        /**
         * 创建时间
         */
        createdTime: string;
        creator: {
            /**
             * ID
             */
            id: number;
            username: string;
        };
    }
}
