export const LogLevel_CONSTANTS = [
    'TRACE', 
    'DEBUG', 
    'INFO', 
    'WARN', 
    'ERROR', 
    'FATAL', 
    'OFF'
] as const;
export type LogLevel = typeof LogLevel_CONSTANTS[number];
