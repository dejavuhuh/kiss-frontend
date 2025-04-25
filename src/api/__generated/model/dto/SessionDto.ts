export type SessionDto = {
    'SessionService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        expiredTime: string;
        user: {
            /**
             * ID
             */
            id: number;
            displayName: string;
        };
    }
}
