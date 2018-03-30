export const minHeight = 200;
export const minWidth = 150;
export const PIPE_TAGS  = {
    START : "START",
    INTEGRATION : "INTEGRATION",
    BUILDER : "BUILDER",
    DEPLOYER : "DEPLOYER",
    CHECKER : "CHECKER",
    ERROR_NOTIFIER : "ERROR_NOTIFIER",
    REPORT_NOTIFIER : "REPORT_NOTIFIER",
    ANY : "ANY"
}
export const IO_TYPES = {
  INPUT: 0,
  OUTPUT: 1,
  ERR: 2
}
/**
 * This class allows us to create a graphical system to create dynamical pipelines
 */
export class PipelineNode{
    constructor(name : string,tag: string,type : string = PIPE_TAGS.ANY){
        this.name = name;
        this.tag = tag;
        this.type = type;
    }
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
    id: string = "";
    /**
     * For what pipe?
     */
    pipe : string = "";
    /**
     * Internal properties for the node
     */
    properties : PipelineNodeAtribute[] = [];
    /**
     * Recive data from a list of nodes.
     * Dont needed
     */
    //inputNodes : PipelineNode[];
    inputConectors : NodeConector[] = [];
    outputConectors : NodeConector[] = [];
    errorConectors : NodeConector[] = [];
    /**
     * Parameters that needs this node
     */
    inputParams : PipelineNodeAtribute[] = [];
    /**
     * Parameters that this node sends to the next
     */
    outputParams : PipelineNodeAtribute[] = [];
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
    public createInputConector() : NodeConector{
        let con = new NodeConector();
        con.originNode = this;
        con.type = IO_TYPES.INPUT;
        this.inputConectors.push(con)
        this.calculatePosInputConectors();
        return con;
    }
    public createOutputConector() : NodeConector{
        let con = new NodeConector();
        con.originNode = this;
        con.type = IO_TYPES.OUTPUT;
        this.outputConectors.push(con)
        this.calculatePosOutputConectors();
        return con;
    }
    public createErrorConector() : NodeConector{
        let con = new NodeConector();
        con.originNode = this;
        con.type = IO_TYPES.ERR;
        this.errorConectors.push(con)
        this.calculatePosErrorConectors();
        return con;
    }
    private calculatePosInputConectors(){
        for(let i = 0; i < this.inputConectors.length; i++){
            this.inputConectors[i].x = 11;
            this.inputConectors[i].y = (i+1)*this.height/(this.inputConectors.length + 1);
        }
    }
    private calculatePosOutputConectors(){
        for(let i = 0; i < this.outputConectors.length; i++){
            this.outputConectors[i].x = this.width-11;
            this.outputConectors[i].y = (i+1)*(this.height/2)/(this.outputConectors.length + 1);
        }
    }
    private calculatePosErrorConectors(){
        for(let i = 0; i < this.errorConectors.length; i++){
            this.errorConectors[i].x = this.width-11;
            this.errorConectors[i].y = ((i+1)*(this.height/2)/(this.errorConectors.length + 1)) + this.height/2;
        } 
    }
    recalculate(){
        this.calculatePosInputConectors();
        this.calculatePosOutputConectors();
        this.calculatePosErrorConectors();
    }
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
export class NodeConector{
    x : number = 11;
    y : number = 11;
    type : number = 0;
    originNode : PipelineNode = null;
    conectedNodes : NodeConector[] = [];
}