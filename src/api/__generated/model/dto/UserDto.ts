export type UserDto = {
    'AuthenticationService/CURRENT_USER': {
        /**
         * ID
         */
        id: number;
        username: string;
        roles: Array<{
            /**
             * ID
             */
            id: number;
            /**
             * 角色名称
             */
            name: string;
            permissions: Array<{
                /**
                 * ID
                 */
                id: number;
                code: string;
            }>;
        }>;
    }, 
    'UserFetchers/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        username: string;
        roles: Array<{
            /**
             * ID
             */
            id: number;
            /**
             * 角色名称
             */
            name: string;
        }>;
    }
}
