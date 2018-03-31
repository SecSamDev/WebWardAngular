export const minHeight = 200;
export const minWidth = 150;
export const PIPE_TAGS = {
    START: "START",
    INTEGRATION: "INTEGRATION",
    BUILDER: "BUILDER",
    DEPLOYER: "DEPLOYER",
    CHECKER: "CHECKER",
    ERROR_NOTIFIER: "ERROR_NOTIFIER",
    REPORT_NOTIFIER: "REPORT_NOTIFIER",
    ANY: "ANY"
}
export const IO_TYPES = {
    INPUT: 0,
    OUTPUT: 1,
    ERR: 2
}
/**
 * This class allows us to create a graphical system to create dynamical pipelines
 */
export class PipelineNode {
    constructor(name: string, tag: string, type: string = PIPE_TAGS.ANY) {
        this.name = name;
        this.tag = tag;
        this.type = type;
    }
    /**
     * Name of the node, like a nickname
     */
    name: string;
    /**
     * Tag for this node, private name for the system. Must be unique
     */
    tag: string;
    /**
     * Pipe Type of this node like START or NOTIFY_ERR
     */
    type: string = PIPE_TAGS.ANY;
    /**
     * Database identificator
     */
    id: string = "";
    /**
     * For what pipe?
     */
    pipe: string = "";
    /**
     * Internal properties for the node
     */
    properties: PipelineNodeAtribute[] = [];
    /**
     * Recive data from a list of nodes.
     * Dont needed
     */
    //inputNodes : PipelineNode[];
    inputConnectors: NodeConnector[] = [];
    outputConnectors: NodeConnector[] = [];
    errorConnectors: NodeConnector[] = [];
    /**
     * Parameters that needs this node
     */
    inputParams: PipelineNodeAtribute[] = [];
    /**
     * Parameters that this node sends to the next
     */
    outputParams: PipelineNodeAtribute[] = [];
    /**
     * Parameters to pass to the error nodes.
     */
    errorParams: PipelineNodeAtribute[] = [];
    /**
     * X position in SVG
     */
    x: number = 1;
    width: number = 200;
    /**
     * Y position in SVG
     */
    y: number = 1;
    height: number = 300;
    selected: boolean = false;
    removeMe(){
        for(let i = 0; i < this.inputConnectors.length; i++){
            this.deleteInput();
            i--;
        }
        for(let i = 0; i < this.outputConnectors.length; i++){
            this.deleteOutput();
            i--;
        }
        for(let i = 0; i < this.errorConnectors.length; i++){
            this.deleteError();
            i--;
        }
    }
    public createInputConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.INPUT;
        this.inputConnectors.push(con)
        this.calculatePosInputConnectors();
        return con;
    }
    public createOutputConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.OUTPUT;
        this.outputConnectors.push(con)
        this.calculatePosOutputConnectors();
        return con;
    }
    public createErrorConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.ERR;
        this.errorConnectors.push(con)
        this.calculatePosErrorConnectors();
        return con;
    }
    private calculatePosInputConnectors() {
        for (let i = 0; i < this.inputConnectors.length; i++) {
            this.inputConnectors[i].x = 11;
            this.inputConnectors[i].y = (i + 1) * this.height / (this.inputConnectors.length + 1);
        }
    }
    private calculatePosOutputConnectors() {
        for (let i = 0; i < this.outputConnectors.length; i++) {
            this.outputConnectors[i].x = this.width - 11;
            this.outputConnectors[i].y = (i + 1) * (this.height / 2) / (this.outputConnectors.length + 1);
        }
    }
    private calculatePosErrorConnectors() {
        for (let i = 0; i < this.errorConnectors.length; i++) {
            this.errorConnectors[i].x = this.width - 11;
            this.errorConnectors[i].y = ((i + 1) * (this.height / 2) / (this.errorConnectors.length + 1)) + this.height / 2;
        }
    }
    recalculate() {
        this.calculatePosInputConnectors();
        this.calculatePosOutputConnectors();
        this.calculatePosErrorConnectors();
    }
    public deleteInput() {
        let con = this.inputConnectors.pop();
        for (let i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    }
    public deleteOutput() {
        let con = this.outputConnectors.pop();
        for (let i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    }
    public deleteError() {
        let con = this.errorConnectors.pop();
        for (let i = 0; i < con.conectedNodes.length; i++) {
            con.conectedNodes[i].removeThisConnector(con);
        }
        this.recalculate();
    }
}
/**
 * Atributes for a pipeline node
 */
export class PipelineNodeAtribute {
    /**
     * Atribute name to be used by other parameters
     */
    name: string;
    /**
     * Friendly name for users
     */
    nickname: string;
    /**
     * Type of the atribute: 'string', 'number', 'URL', 'boolean','select','time'
     */
    type: string;
    /**
     * Default value
     */
    value: any;
    /**
     * Is optional this atribute
     */
    optional: boolean;
    /**
     * Description for the atribute. Help users
     */
    description: string;
    /**
     * Depends on a parameter for showing
     */
    depends: string;
    /**
     * The parameter value must be this
     */
    depends_value: string;
}

export const NODE_ATTR = {
    string: 'STRING',
    number: 'NUMBER',
    url: 'URL',
    boolean: 'BOOLEAN',
    select: 'SELECT',
    time: 'TIME',
    folder: 'FOLDER',
    file: 'FILE',
    error: 'ERROR',
    SCAN_REPORT: 'SCAN_REPORT',
    ip: 'IP',
    port: 'PORT'
}
/**
 * Conector de un Nodo. Pueden conectarse varios Nodos a este conector.
 */
export class NodeConnector {
    x: number = 11;
    y: number = 11;
    type: number = 0;
    originNode: PipelineNode = null;
    conectedNodes: NodeConnector[] = [];

    /**
     * Busca el conector y lo elimina de nuestra lista de conexiones
     * @param con 
     */
    public removeThisConnector(con: NodeConnector) {
        for (let i = 0; i < this.conectedNodes.length; i++) {//Para cada conector
            if (this.conectedNodes[i] === con) {//encontramos al conector
                this.conectedNodes.splice(i, 1);
                con.removeThisConnector(this);
                break;
            }
        }
    }
    /**
     * Une dos conectores
     * @param con 
     */
    public joinToConnector(con: NodeConnector): boolean {
        if (con.originNode !== this.originNode && con.addConnector(this) && this.addConnector(con)) {
            return true;
        } else {
            con.removeThisConnector(this);
            this.removeThisConnector(con);
            return false;
        }
    }
    /**
     * Añade un conector a nuestra lista. Devuelve true si lo logra y si no false.
     * @param con 
     */
    private addConnector(con: NodeConnector): boolean {
        if (!this.conectedNodes.find((elem) => {
            if (elem === con) {
                return true;
            } else {
                return false;
            }
        })) {
            if (this.type === IO_TYPES.INPUT && (con.type === IO_TYPES.ERR || con.type === IO_TYPES.OUTPUT)) {
                this.conectedNodes.push(con);
                return true;
            } else if (con.type === IO_TYPES.INPUT && (this.type === IO_TYPES.ERR || this.type === IO_TYPES.OUTPUT)) {
                this.conectedNodes.push(con);
                return true;
            }
        }
        return false;
    }
}