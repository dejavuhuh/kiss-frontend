import type {ExportTaskScene, ExportTaskStatus} from '../enums/';

export type ExportTaskDto = {
    'ExportTaskService/LIST_ITEM': {
        /**
         * ID
         */
        id: number;
        /**
         * 创建时间
         */
        createdTime: string;
        traceId: string;
        scene: ExportTaskScene;
        status: ExportTaskStatus;
    }
}
