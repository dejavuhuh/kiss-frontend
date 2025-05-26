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
     * 根据上级分类 ID 查询下级分类
     */
    readonly listByParentId: (options: ProductCategoryServiceOptions['listByParentId']) => Promise<
        Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/product-categories/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ProductCategoryDto['ProductCategoryService/LIST_ITEM']>>;
    }
    
    /**
     * 查询一级分类
     */
    readonly listRoots: () => Promise<
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
    'listRoots': {}, 
    'listByParentId': {
        id: number
    }
}
