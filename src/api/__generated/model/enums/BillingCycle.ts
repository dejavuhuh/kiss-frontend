export const BillingCycle_CONSTANTS = [
    'MONTHLY', 
    'YEARLY'
] as const;
export type BillingCycle = typeof BillingCycle_CONSTANTS[number];
