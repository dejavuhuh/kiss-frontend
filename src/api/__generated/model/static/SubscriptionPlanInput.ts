import type {BillingCycle} from '../enums/';

export interface SubscriptionPlanInput {
    name: string;
    billingCycle: BillingCycle;
    price: number;
}
