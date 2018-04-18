import { PipelineNode } from './node'
/**
 * This class allow us to look at the information of the pipeline.
 */
export class Pipeline {
    /**
     * ID of the pipeline stored in the DB
     */
    id: string = "";
    /**
     * User owner of this pipeline
     */
    owner: string = "";
    /**
     * Name of the pipeline
     */
    name: string = "";
    web_project : string = "";
    /**
     * Description of the pipeline
     */
    description: string = "";
    /**
     * Status of the pipeline
     */
    status: number = 5;
    /**
     * When the pipeline was created
     */
    create_date: Date = new Date(Date.now());
    /**
     * When the pipeline was lastly updated
     */
    last_update: Date = new Date(Date.now());
    /**
     * This must be or PipelineNode or String
     */
    nodes: any[] = [];
}