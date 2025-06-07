import type {Executor} from '../';
import type {ProductCategoryDto} from '../model/dto/';
import type {ProductCategoryInput} from '../model/static/';

/**
 * 商品分类管理
 */
export class ProductCategoryService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 创建商品分类
     */
    readonly create: (options: ProductCategoryServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/product-categories';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    /**
     * 查询商品分类树
     */
    readonly list: () => Promise<
        Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']>
    > = async() => {
        let _uri = '/product-categories';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']>>;
    }
}

export type ProductCategoryServiceOptions = {
    'create': {
        body: ProductCategoryInput
    }, 
    'list': {}
}
