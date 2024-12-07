import type {URI} from './';

export interface ProblemDetail {
    type: URI;
    title?: string | undefined;
    status: number;
    detail?: string | undefined;
    instance?: URI | undefined;
}
