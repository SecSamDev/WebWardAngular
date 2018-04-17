import { EventEmitter } from '@angular/core';
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
     * Actual status of the node
     */
    status : number = 0;
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
    subscriptor = new EventEmitter<boolean>();
    
    setStatus(status:number){
        this.status = status; 
        this.subscriptor.emit(true);
    }
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
        let con = new NodeConnector(generateIdForConnector());
        con.originNode = this;
        con.type = IO_TYPES.INPUT;
        this.inputConnectors.push(con)
        this.calculatePosInputConnectors();
        return con;
    }
    public createOutputConnector(): NodeConnector {
        let con = new NodeConnector(generateIdForConnector());
        con.originNode = this;
        con.type = IO_TYPES.OUTPUT;
        this.outputConnectors.push(con)
        this.calculatePosOutputConnectors();
        return con;
    }
    public createErrorConnector(): NodeConnector {
        let con = new NodeConnector(generateIdForConnector());
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
        ret.properties = this.properties;
        ret.inputConnectors = this.inputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.outputConnectors = this.outputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.errorConnectors = this.errorConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        console.log("Saving node: ")
        console.log(ret)
        return ret;

    }
    public fillReferences(array: PipelineNode[]) {
        //FIRST INPUT
        for (let i = 0; i < this.inputConnectors.length; i++) {//Cada Conector de entrada nuestro
            let connecteds = this.inputConnectors[i].conectedNodes;
            let us_in_connector = this.inputConnectors[i];//Nuestro conector de entrada
            us_in_connector.conectedNodes = [];
            for (let i_c = 0; i_c < connecteds.length; i_c++) {//Cada conectado a nuestro conector
                //El conector unido al nuestro
                let his_connector_toUs = connecteds[i_c];
                //Obtenemos referencia real al nodo
                let pipNode = findNodeInArray(array, his_connector_toUs.originNode ? his_connector_toUs.originNode.id : "");//Nodo conectado
                if (pipNode) {
                    //conRef = OutputConnectors or ErrorConnectors
                    let connectorsOfConectedToUs = his_connector_toUs.type === 1 ?
                        pipNode.outputConnectors : his_connector_toUs.type === 2 ?
                            pipNode.errorConnectors : [];
                    let findConector = false;
                    for (let i_pnc = 0; i_pnc < connectorsOfConectedToUs.length; i_pnc++) {
                        //Buscar conector del nodo conectado
                        let outOrErr = connectorsOfConectedToUs[i_pnc];
                        if (outOrErr.id === his_connector_toUs.id) {
                            //We exists in the other node
                            findConector = true;
                            us_in_connector.addConnector(outOrErr)
                            outOrErr.addConnector(us_in_connector)
                            break;
                        }
                    }
                    if (!findConector) {//We cant find the connector
                        console.log(`Not connected to us: ${his_connector_toUs}`)
                        connecteds.splice(i_c, 1);
                        i_c--;
                    }
                } else {
                    //Nodo no encontrado
                    console.log("Nodo no encontrado")
                    connecteds.splice(i_c, 1);
                    i_c--;
                }
            }
        }
        this.clean(array);
    }
    /**
     * Removes ghost conectors
     * @param array 
     */
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
/**
 * 
 * @param data The new PipelineNode
 */
export function pipelineNodeFromJSON(data): PipelineNode {
    let node = new PipelineNode(data.name, data.tag, data.type);
    if (data.id)
        node.id = data.id;
    if (data.outputParams)
        node.outputParams = data.outputParams;
    if (data.inputParams)
        node.inputParams = data.inputParams;
    if (data.errorParams)
        node.errorParams = data.errorParams;
    if (data.properties)
        node.properties = data.properties;
    if (data.x && typeof data.x === 'number')
        node.x = data.x;
    if (data.y && typeof data.y === 'number')
        node.y = data.y;
    if (data.height && typeof data.height === 'number')
        node.height = data.height;
    if (data.width && typeof data.width === 'number')
        node.width = data.width;
    if (data.pipe)
        node.pipe = data.pipe;
    if(data.status)
        node.status = data.status;
    if(data.inputConnectors)
        node.inputConnectors = connectorsFromJSONarray(data.inputConnectors, 0, node);
    if(data.outputConnectors)
        node.outputConnectors = connectorsFromJSONarray(data.outputConnectors, 1, node);
    if(data.errorConnectors)
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
    constructor(id){
        this.id = id;
    }
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
    public addConnector(con: NodeConnector): boolean {
        for (let i = 0; i < this.conectedNodes.length; i++) {
            if (this.conectedNodes[i].id === con.id) {
                this.conectedNodes[i] = con;
                return false;
            }
        }
        if (this.type === IO_TYPES.INPUT && (con.type === IO_TYPES.ERR || con.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        } else if (con.type === IO_TYPES.INPUT && (this.type === IO_TYPES.ERR || this.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        }
    }
}
export function connectorsFromJSONarray(array: any[], type: number, originNode: PipelineNode): NodeConnector[] {
    let conectors: NodeConnector[] = [];
    for (let i = 0; i < array.length; i++) {
        conectors.push(nodeConnectorFromJSON(array[i], originNode, type))
    }
    return conectors;
}

export function nodeConnectorFromJSON(data, originNode: PipelineNode, type: number): NodeConnector {
    let aux = new NodeConnector(data.id ? data.id : generateIdForConnector());
    aux.x = data.x || 0;
    aux.y = data.y || 0;
    aux.type = type;
    if(originNode)
        aux.originNode = originNode;
    if(data.conectedNodes){
        aux.conectedNodes = data.conectedNodes.map((val, i, arr) => {
            let ret = new NodeConnector(val.id);
            ret.type = val.type;
            if (typeof val.originNode === 'string') {
                ret.originNode = new PipelineNode("", "");
                ret.originNode.id = val.originNode;
            }
            return ret;
        });
    }
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

function generateIdForConnector(){
    return Date.now().toString(36).substring(6,15) + Math.random().toString(36).substring(2, 7);
  }