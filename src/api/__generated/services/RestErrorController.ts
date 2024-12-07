import type {Executor} from '../';
import type {ProblemDetail} from '../model/static/';

export class RestErrorController {
    
    constructor(private executor: Executor) {}
    
    readonly error: () => Promise<
        ProblemDetail
    > = async() => {
        let _uri = '/error';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<ProblemDetail>;
    }
}

export type RestErrorControllerOptions = {
    'error': {}
}
