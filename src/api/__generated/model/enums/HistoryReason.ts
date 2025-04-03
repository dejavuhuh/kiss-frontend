export const HistoryReason_CONSTANTS = [
    'EXPIRED', 
    'SIGN_OUT', 
    'KICK_OUT'
] as const;
export type HistoryReason = typeof HistoryReason_CONSTANTS[number];
