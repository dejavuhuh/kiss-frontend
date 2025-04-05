import type {Executor} from '../';
import type {IssueInput} from '../model/static/';

export class IssueService {
    
    constructor(private executor: Executor) {}
    
    readonly report: (options: IssueServiceOptions['report']) => Promise<
        void
    > = async(options) => {
        let _uri = '/issues';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type IssueServiceOptions = {
    'report': {
        body: IssueInput
    }
}
