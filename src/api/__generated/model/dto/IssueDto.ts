import type {IssueState} from '../enums/';
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
        state: IssueState;
        creator: {
            /**
             * ID
             */
            id: number;
            displayName: string;
        };
        relatedTo?: {
            /**
             * ID
             */
            id: number;
        } | undefined;
        relatedFrom: Array<{
            /**
             * ID
             */
            id: number;
        }>;
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
            displayName: string;
        };
    }, 
    'IssueService/RELATABLE': {
        /**
         * ID
         */
        id: number;
        title: string;
        creator: {
            /**
             * ID
             */
            id: number;
            displayName: string;
        };
    }
}
