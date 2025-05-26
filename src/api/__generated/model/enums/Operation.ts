export const Operation_CONSTANTS = [
    'CREATE', 
    'UPDATE', 
    'BIND_ROLES', 
    'DELETE'
] as const;
export type Operation = typeof Operation_CONSTANTS[number];
