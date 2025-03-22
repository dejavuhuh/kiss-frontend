import type {Executor} from '../';
import type {JobService_JobView} from '../model/static/';

export class JobService {
    
    constructor(private executor: Executor) {}
    
    readonly list: () => Promise<
        Array<JobService_JobView>
    > = async() => {
        let _uri = '/jobs';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<JobService_JobView>>;
    }
}

export type JobServiceOptions = {
    'list': {}
}
