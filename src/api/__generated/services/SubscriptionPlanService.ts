import type {Executor} from '../';
import type {SubscriptionPlanDto} from '../model/dto/';
import type {SubscriptionPlanInput} from '../model/static/';

export class SubscriptionPlanService {
    
    constructor(private executor: Executor) {}
    
    readonly create: (options: SubscriptionPlanServiceOptions['create']) => Promise<
        void
    > = async(options) => {
        let _uri = '/subscription/plans';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
    
    readonly list: () => Promise<
        Array<SubscriptionPlanDto['SubscriptionPlanService/LIST_ITEM']>
    > = async() => {
        let _uri = '/subscription/plans';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<SubscriptionPlanDto['SubscriptionPlanService/LIST_ITEM']>>;
    }
}

export type SubscriptionPlanServiceOptions = {
    'list': {}, 
    'create': {
        body: SubscriptionPlanInput
    }
}
