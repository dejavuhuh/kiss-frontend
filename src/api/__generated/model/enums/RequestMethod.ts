export const RequestMethod_CONSTANTS = [
    'GET', 
    'HEAD', 
    'POST', 
    'PUT', 
    'PATCH', 
    'DELETE', 
    'OPTIONS', 
    'TRACE'
] as const;
export type RequestMethod = typeof RequestMethod_CONSTANTS[number];
