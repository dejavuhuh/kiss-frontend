import type {HistoryReason} from '../enums/';

export interface SessionHistorySpecification {
    id?: number | undefined;
    reason?: HistoryReason | undefined;
    minCreatedTime?: string | undefined;
    maxCreatedTime?: string | undefined;
    username?: string | undefined;
}
