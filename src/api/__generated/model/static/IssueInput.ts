import type {HttpRequest} from './';

export interface IssueInput {
    request: HttpRequest;
    traceId: string;
    title: string;
    description: string;
}
