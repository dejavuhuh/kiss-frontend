import type {Executor} from '../';
import type {LoggingService_ConfigureLevelEvent} from '../model/static/';

export class LoggingService {
    
    constructor(private executor: Executor) {}
    
    readonly configureLevel: (options: LoggingServiceOptions['configureLevel']) => Promise<
        void
    > = async(options) => {
        let _uri = '/logging/configureLevel';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Promise<void>;
    }
}

export type LoggingServiceOptions = {
    'configureLevel': {
        body: LoggingService_ConfigureLevelEvent
    }
}
