export interface ProductCategoryInput {
    name: string;
    isLeaf: boolean;
    banner?: string | undefined;
    parentId?: number | undefined;
}
