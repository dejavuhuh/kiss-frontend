import type {Executor} from '../';

export class SystemErrorService {
    
    constructor(private executor: Executor) {}
    
    readonly report: () => Promise<
        void
    > = async() => {
        let _uri = '/system-errors';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
}

export type SystemErrorServiceOptions = {
    'report': {}
}
