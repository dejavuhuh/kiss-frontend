import type {LogLevel} from '../enums/';

export interface LoggingService_ConfigureLevelEvent {
    logger: string;
    level: LogLevel;
}
