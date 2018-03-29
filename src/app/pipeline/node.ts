import {PIPE_TAGS} from './pipe-tags'

export const minHeight = 200;
export const minWidth = 150;

/**
 * This class allows us to create a graphical system to create dynamical pipelines
 */
export class PipelineNode{
    /**
     * Name of the node, like a nickname
     */
    name : string;
    /**
     * Tag for this node, private name for the system. Must be unique
     */
    tag : string;
    /**
     * Pipe Type of this node like START or NOTIFY_ERR
     */
    type : string = PIPE_TAGS.ANY;
    /**
     * Database identificator
     */
    id: string;
    /**
     * For what pipe?
     */
    pipe : string;
    /**
     * Internal properties for the node
     */
    properties : PipelineNodeAtribute[] = [];
    /**
     * Recive data from a list of nodes.
     * Dont needed
     */
    //inputNodes : PipelineNode[];
    /**
     * Parameters that needs this node
     */
    inputParams : PipelineNodeAtribute[] = [];
    /**
     * If the pipeline node is passed then send the result to the next node or nodes.
     */
    outputNodes : any = [];
    /**
     * Parameters that this node sends to the next
     */
    outputParams : PipelineNodeAtribute[] = [];
    /**
     * If this pipeline node fails then send the result to the nexxt error node
     */
    errorNodes : any= [];
    /**
     * Parameters to pass to the error nodes.
     */
    errorParams : PipelineNodeAtribute[] = [];
    /**
     * X position in SVG
     */
    x : number = 1;
    width : number = 200;
    /**
     * Y position in SVG
     */
    y : number = 1;
    height : number = 300;
    selected : boolean = false;
}
/**
 * Atributes for a pipeline node
 */
export class PipelineNodeAtribute{
    /**
     * Atribute name to be used by other parameters
     */
    name : string;
    /**
     * Friendly name for users
     */
    nickname : string;
    /**
     * Type of the atribute: 'string', 'number', 'URL', 'boolean','select','time'
     */
    type : string;
    /**
     * Default value
     */
    value: any;
    /**
     * Is optional this atribute
     */
    optional : boolean;
    /**
     * Description for the atribute. Help users
     */
    description : string;
    /**
     * Depends on a parameter for showing
     */
    depends : string;
    /**
     * The parameter value must be this
     */
    depends_value : string;
}

export const NODE_ATTR = {
    string : 'STRING',
    number : 'NUMBER',
    url : 'URL',
    boolean : 'BOOLEAN',
    select : 'SELECT',
    time : 'TIME',
    folder : 'FOLDER',
    file : 'FILE',
    error : 'ERROR',
    SCAN_REPORT : 'SCAN_REPORT',
    ip : 'IP',
    port : 'PORT'
 }
