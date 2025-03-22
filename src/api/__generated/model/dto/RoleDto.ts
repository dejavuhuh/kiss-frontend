export type RoleDto = {
    'RoleService/LIST_FETCHER': {
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
    }
}
