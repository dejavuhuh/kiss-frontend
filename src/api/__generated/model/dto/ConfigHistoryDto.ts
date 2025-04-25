export type ConfigHistoryDto = {
    'ConfigService/HISTORY_LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        yaml?: string | undefined;
        reason: string;
        creator: {
            /**
             * ID
             */
            id: number;
            displayName: string;
        };
    }
}
