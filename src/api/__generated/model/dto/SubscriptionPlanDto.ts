import type {BillingCycle} from '../enums/';

export type SubscriptionPlanDto = {
    'SubscriptionPlanService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        name: string;
        billingCycle: BillingCycle;
        price: number;
    }
}
