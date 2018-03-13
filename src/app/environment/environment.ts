enum WEB_ENV {
    DEV,
    PRE,
    PRO,
    NOT
}

export class Environment {
    /**
     * Identification in the DB
     */
    id: string;
    /**
     * Name of the environment
     */
    name: string;
    /**
     * Description of the environment
     */
    description: string;
    /**
     * Type of the environment: Development, PreProduction, Production and NOT defined
     */
    type: WEB_ENV;
    /**
     * Location of the Web, in development its dinamically defined by the system
     */
    route : string;
    /**
     * Profile for scanning this environment
     */
    scanProfile : string;
}