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
    removeMe() {
        for (let i = 0; i < this.inputConnectors.length; i++) {
            this.deleteInput();
            i--;
        }
        for (let i = 0; i < this.outputConnectors.length; i++) {
            this.deleteOutput();
            i--;
        }
        for (let i = 0; i < this.errorConnectors.length; i++) {
            this.deleteError();
            i--;
        }
    }
    public createInputConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.INPUT;
        con.id = this.inputConnectors.length.toString();
        this.inputConnectors.push(con)
        this.calculatePosInputConnectors();
        return con;
    }
    public createOutputConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.OUTPUT;
        con.id = this.outputConnectors.length.toString();
        this.outputConnectors.push(con)
        this.calculatePosOutputConnectors();
        return con;
    }
    public createErrorConnector(): NodeConnector {
        let con = new NodeConnector();
        con.originNode = this;
        con.type = IO_TYPES.ERR;
        con.id = this.errorConnectors.length.toString();
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
    /**
     * Serialize the object to a JSON format witouth references
     */
    public toJSON(): any {
        let ret: any = {};
        ret.id = this.id;
        ret.name = this.name;
        ret.type = this.type;
        ret.tag = this.tag;
        ret.y = this.y;
        ret.x = this.x;
        ret.width = this.width;
        ret.height = this.height;
        ret.pipe = this.pipe;
        ret.inputParams = this.inputParams;
        ret.outputParams = this.outputParams;
        ret.errorParams = this.errorParams;
        ret.inputConnectors = this.inputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.outputConnectors = this.outputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.errorConnectors = this.errorConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        return ret;

    }
    public fillReferences(array: PipelineNode[]) {
        //FIRST INPUT
        for (let i = 0; i < this.inputConnectors.length; i++) {//Cada Conector
            let connecteds = this.inputConnectors[i].conectedNodes;
            this.inputConnectors[i].conectedNodes = [];
            for (let i_c = 0; i_c < connecteds.length; i_c++) {//Cada conectado a nuestro conector
                //Obtenemos referencia real al nodo
                let pipNode = findNodeInArray(array, connecteds[i_c].originNode ? connecteds[i_c].originNode.id : "");//Nodo conectado
                if (pipNode !== null) {
                    //conRef = OutputConnectors or ErrorConnectors
                    let conRef = connecteds[i_c].type === 1 ? pipNode.outputConnectors : pipNode.errorConnectors;
                    for (let i_pnc = 0; i_pnc < conRef.length; i_pnc++) {//Buscar conector del nodo conectado
                        if (conRef[i_pnc].id === connecteds[i_c].id) {
                            //The connector we are searching for
                            this.inputConnectors[i].conectedNodes.push(conRef[i_pnc]);
                            for (let j_conRef = 0; j_conRef < conRef[i_pnc].conectedNodes.length; j_conRef++) {
                                if (conRef[i_pnc].conectedNodes[j_conRef].id === this.inputConnectors[i].id) {
                                    conRef[i_pnc].conectedNodes[j_conRef] = this.inputConnectors[i];
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

            }
        }
        this.clean(array);
    }
    public clean(array: PipelineNode[]) {
        for (let i = 0; i < this.inputConnectors.length; i++) {//Cada Conector
            if (this.inputConnectors[i].conectedNodes.length > 0) {
                let conecteds = this.inputConnectors[i].conectedNodes;
                for (let j = 0; j < conecteds.length; j++) {
                    let node = findNodeInArray(array, conecteds[j].originNode.id);
                    if (!node) {
                        this.inputConnectors[i].removeThisConnector(conecteds[j])
                        j--;
                    }
                }

            }
        }
    }
}
export function pipelineNodeFromJSON(data) {
    let node = new PipelineNode(data.name, data.tag, data.type);
    node.id = data.id;
    node.outputParams = data.outputParams;
    node.inputParams = data.inputParams;
    node.errorParams = data.errorParams;
    if (data.x && typeof data.x === 'number')
        node.x = data.x;
    if (data.y && typeof data.y === 'number')
        node.y = data.y;
    if (data.height && typeof data.height === 'number')
        node.height = data.height;
    if (data.width && typeof data.width === 'number')
        node.width = data.width;
    node.pipe = data.pipe;
    node.inputConnectors = connectorsFromJSONarray(data.inputConnectors, 0, node);
    node.outputConnectors = connectorsFromJSONarray(data.outputConnectors, 1, node);
    node.errorConnectors = connectorsFromJSONarray(data.errorConnectors, 2, node);
    node.recalculate();
    return node;
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
    /**
     * Reference of the ID number of this connector in the list
     */
    id: string;
    x: number = 11;
    y: number = 11;
    type: number = 0;
    originNode: PipelineNode = null;
    conectedNodes: NodeConnector[] = [];

    /**
     * Serialize the object to a JSON format witouth references
     */
    public toJSON(): any {
        let ret: any = {};
        ret.id = this.id;
        ret.conectedNodes = this.conectedNodes.map((val, i, arr) => {
            let aux: any = {};
            aux.id = val.id;
            aux.type = val.type
            aux.originNode = val.originNode.id;
            return aux;
        });
        return ret;
    }
    /**
     * Busca el conector y lo elimina de nuestra lista de conexiones
     * @param con 
     */
    public removeThisConnector(con: NodeConnector) {
        for (let i = 0; i < this.conectedNodes.length; i++) {//Para cada conector
            if (this.conectedNodes[i] === con) {//encontramos al conector
                this.conectedNodes.splice(i, 1);
                con.removeThisConnector(this)
                break;
            } else if (this.conectedNodes[i].originNode && this.conectedNodes[i].originNode.pipe === "") {
                this.conectedNodes.splice(i, 1);
                con.removeThisConnector(this)
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
export function connectorsFromJSONarray(array: any[], type: number, originNode: PipelineNode): NodeConnector[] {
    let nodes: NodeConnector[] = [];
    for (let i = 0; i < array.length; i++) {
        nodes.push(nodeConnectorFromJSON(array[i], originNode, type))
    }
    return nodes;
}

export function nodeConnectorFromJSON(data, originNode: PipelineNode, type: number): NodeConnector {
    let aux = new NodeConnector();
    aux.x = data.x || 0;
    aux.y = data.y || 0;
    aux.id = data.id;
    aux.type = type;
    aux.originNode = originNode;
    aux.conectedNodes = data.conectedNodes.map((val, i, arr) => {
        let ret = new NodeConnector();
        ret.id = val.id;
        ret.type = val.type;
        if (typeof val.originNode === 'string') {
            ret.originNode = new PipelineNode("", "");
            ret.originNode.id = val.originNode;
        }
        return ret;
    });
    return aux;
}

function findNodeInArray(array: PipelineNode[], nodeID: string) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === nodeID) {
            return array[i];
        }
    }
    return null;
}