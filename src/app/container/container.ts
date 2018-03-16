export class KubeContainer {
    /**
     * Name of this container stored in the DB
     */
    name : string;
    /**
     * Image of this container
     */
    image : string;
    /**
     * Simple configuration = YAML file
     */
    config : string;
}
/**
 * Informative class that shows the limits of this namespace
 */
export class KubeNamespace {
    nProcess : number;
    memory : string;
}
