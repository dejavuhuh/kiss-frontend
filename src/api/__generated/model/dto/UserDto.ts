export type UserDto = {
    'AuthenticationService/CURRENT_USER': {
        /**
         * ID
         */
        id: number;
        username: string;
    }, 
    'UserService/LIST': {
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
