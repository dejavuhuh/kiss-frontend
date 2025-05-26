import type {Executor} from '../';
import type {JobService_JobView} from '../model/static/';

/**
 * 定时任务管理
 */
export class JobService {
    
    constructor(private executor: Executor) {}
    
    /**
     * 查询定时任务列表
     */
    readonly list: () => Promise<
        Array<JobService_JobView>
    > = async() => {
        let _uri = '/jobs';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<JobService_JobView>>;
    }
    
    /**
     * 触发定时任务
     */
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
