export type UserDto = {
    'AuthenticationService/CURRENT_USER': {
        /**
         * ID
         */
        id: number;
        username: string;
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
    }
}
