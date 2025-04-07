export const IssueState_CONSTANTS = [
    'OPEN', 
    'CLOSED'
] as const;
export type IssueState = typeof IssueState_CONSTANTS[number];
