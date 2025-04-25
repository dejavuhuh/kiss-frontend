export type RoleDto = {
    'RoleFetchers/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        /**
         * 角色名称
         */
        name: string;
        /**
         * 角色描述
         */
        description?: string | undefined;
        creator: {
            /**
             * ID
             */
            id: number;
            displayName: string;
        };
    }, 
    'RoleFetchers/SIMPLE': {
        /**
         * ID
         */
        id: number;
        /**
         * 角色名称
         */
        name: string;
    }
}
