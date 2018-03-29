import {PipelineNode} from './node'
/**
 * This class allow us to look at the information of the pipeline.
 */
export class Pipeline{
    /**
     * ID of the pipeline stored in the DB
     */
    id :string;
    /**
     * User owner of this pipeline
     */
    owner :string;
    /**
     * Name of the pipeline
     */
    name :String;
    /**
     * Description of the pipeline
     */
    description : string;
    /**
     * When the pipeline was created
     */
    create_date : Date;
    /**
     * When the pipeline was lastly updated
     */
    last_update : Date;
    /**
     * This must be or PipelineNode or String
     */
    nodes : any[];
}