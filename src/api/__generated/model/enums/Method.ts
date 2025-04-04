export const Method_CONSTANTS = [
    'GET', 
    'HEAD', 
    'POST', 
    'PUT', 
    'DELETE'
] as const;
export type Method = typeof Method_CONSTANTS[number];
