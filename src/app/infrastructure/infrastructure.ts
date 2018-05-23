/**
 * Simplify the infraestructure file. We store it and the platform will transform it into a kubernetes file or docker
 */
export class WWInfrastructure{
    id : string;
    /**
     * Name of infraestructure
     */
    name : string;
    /**
     * Name of infraestructure
     */
    description : string;
    content : any = {};
    /**
     * This infrastructure is active in the server?
     */
    active : boolean = false;
}