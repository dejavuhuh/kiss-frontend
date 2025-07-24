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
        enabled: boolean;
        name: string;
        isLeaf: boolean;
        sortOrder: number;
        banner?: string | undefined;
        children?: Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']> | undefined;
    }
}
