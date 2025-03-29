import type {Executor} from '../';

export class FaultService {
    
    constructor(private executor: Executor) {}
    
    /**
     * CPU密集型请求
     */
    readonly cpuIntensive: () => Promise<
        void
    > = async() => {
        let _uri = '/fault/cpu-intensive';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<void>;
    }
    
    /**
     * 模拟高CPU使用率
     */
    readonly highCpu: () => Promise<
        void
    > = async() => {
        let _uri = '/fault/high-cpu';
        return (await this.executor({uri: _uri, method: 'POST'})) as Promise<void>;
    }
}

export type FaultServiceOptions = {
    'highCpu': {}, 
    'cpuIntensive': {}
}
