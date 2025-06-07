export type ProductCategoryDto = {
    'ProductCategoryService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        name: string;
        isLeaf: boolean;
        sortOrder: number;
        children?: Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']> | undefined;
    }
}
