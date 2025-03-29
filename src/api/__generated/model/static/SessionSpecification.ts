export interface SessionSpecification {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 创建时间
     */
    minCreatedTime?: string | undefined;
    /**
     * 创建时间
     */
    maxCreatedTime?: string | undefined;
    username?: string | undefined;
}
