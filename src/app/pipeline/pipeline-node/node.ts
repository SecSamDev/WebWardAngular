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
     * Database identificator
     */
    id: string;
    /**
     * Internal properties for the node
     */
    properties : PipelineNodeAtribute[] = [];
    /**
     * Recive data from a node
     */
    inputNode : PipelineNode;
    /**
     * Parameters that needs this node
     */
    inputParams : PipelineNodeAtribute[] = [];
    /**
     * If the pipeline node is passed then send the result to the next node or nodes.
     */
    outputNodes : PipelineNode[] = [];
    /**
     * Parameters that this node sends to the next
     */
    outputParams : PipelineNodeAtribute[] = [];
    /**
     * If this pipeline node fails then send the result to the nexxt error node
     */
    errorNodes : PipelineNode[] = [];
    /**
     * Parameters to pass to the error nodes.
     */
    errorParams : PipelineNodeAtribute[] = [];
    x : number = 1;
    y : number = 1;
}
/**
 * Atributes for a pipeline node
 */
export class PipelineNodeAtribute{
    /**
     * Atribute name
     */
    name : string;
    /**
     * Type of the atribute: 'string', 'number', 'URL', 'boolean'
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
}
