import type {Executor} from '../';
import type {ExportTaskDto} from '../model/dto/';
import type {ExportTaskScene} from '../model/enums/';

export class ExportTaskService {
    
    constructor(private executor: Executor) {}
    
    readonly list: (options: ExportTaskServiceOptions['list']) => Promise<
        Array<ExportTaskDto['ExportTaskService/LIST_ITEM']>
    > = async(options) => {
        let _uri = '/export-tasks';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.scene;
        _uri += _separator
        _uri += 'scene='
        _uri += encodeURIComponent(_value);
        _separator = '&';
        return (await this.executor({uri: _uri, method: 'GET'})) as Promise<Array<ExportTaskDto['ExportTaskService/LIST_ITEM']>>;
    }
}

export type ExportTaskServiceOptions = {
    'list': {
        scene: ExportTaskScene
    }
}
