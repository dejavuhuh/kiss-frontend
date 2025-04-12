export type ConfigDto = {
    'ConfigService/DETAIL': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        name: string;
        yaml?: string | undefined;
        version: number;
        creator: {
            /**
             * ID
             */
            id: number;
            username: string;
        };
    }, 
    'ConfigService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        name: string;
        version: number;
        creator: {
            /**
             * ID
             */
            id: number;
            username: string;
        };
    }
}
