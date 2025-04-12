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
        creator: {
            /**
             * ID
             */
            id: number;
            username: string;
        };
    }
}
