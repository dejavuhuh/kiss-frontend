export type RoleDto = {
    'RoleService/LIST_FETCHER': {
        /**
         * ID
         */
        readonly id: number;
        /**
         * 创建时间
         */
        readonly createdAt: string;
        /**
         * 角色名称
         */
        readonly name: string;
        /**
         * 角色描述
         */
        readonly description?: string | undefined;
    }
}
