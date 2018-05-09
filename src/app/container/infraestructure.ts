/**
 * Simplify the infraestructure file. We store it and the platform will transform it into a kubernetes file or docker
 */
export class WWInfraestructure{
    /**
     * Name of infraestructure
     */
    name : string;
    /**
     * Memory access
     */
    mem="100Mi";
    /**
     * Access to processor
     */
    proc=1;
    /**
     * Name of the image
     */
    img="";
    /**
     * Ports exposed
     */
    ports = []
    /**
     * Replicas of the container
     */
    replicas = 1;
    /**
     * Volumes needed
     */
    volumes = [];
    /**
     * Environmental variables
     */
    environment = {};
    /**
     * List of other infraestructures to be pased to this infraestructure
     */
    host : string[] = [];
}