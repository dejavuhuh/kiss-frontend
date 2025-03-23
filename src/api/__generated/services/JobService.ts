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
    
    readonly trigger: (options: JobServiceOptions['trigger']) => Promise<
        void
    > = async(options) => {
        let _uri = '/jobs/';
        _uri += encodeURIComponent(options.name);
        _uri += '/trigger';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
}

export type JobServiceOptions = {
    'list': {}, 
    'trigger': {
        name: string
    }
}
