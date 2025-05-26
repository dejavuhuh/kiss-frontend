import type {RequestMethod} from '../enums/';

export type ApiDto = {
    'PermissionFetchers/API_LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        name: string;
        method: RequestMethod;
        path: string;
        group: {
            /**
             * ID
             */
            id: number;
            name: string;
        };
    }
}
