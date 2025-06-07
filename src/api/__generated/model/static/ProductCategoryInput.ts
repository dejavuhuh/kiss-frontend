export interface ProductCategoryInput {
    name: string;
    isLeaf: boolean;
    parentId?: number | undefined;
}
