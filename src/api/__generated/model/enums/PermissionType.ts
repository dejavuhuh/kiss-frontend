export const PermissionType_CONSTANTS = [
    'DIRECTORY', 
    'PAGE', 
    'BUTTON'
] as const;
export type PermissionType = typeof PermissionType_CONSTANTS[number];
