export interface IssueSpecification {
    title?: string | undefined;
    description?: string | undefined;
    traceId?: string | undefined;
    /**
     * 创建时间
     */
    minCreatedTime?: string | undefined;
    /**
     * 创建时间
     */
    maxCreatedTime?: string | undefined;
    creatorId?: number | undefined;
}
