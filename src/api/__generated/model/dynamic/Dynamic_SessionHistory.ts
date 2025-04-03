import type {HistoryReason} from '../enums/';
import type {Dynamic_User} from './';

export interface Dynamic_SessionHistory {
    id?: number;
    user?: Dynamic_User;
    reason?: HistoryReason;
    createdTime?: string;
}
