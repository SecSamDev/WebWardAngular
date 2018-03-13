import {Environment} from '../environment/environment';

export class WebProject {
    /**
     * Identification of the project in the db
     */
    id : string;
    /**
     * Name of the project
     */
    name : string;
    /**
     * Description of the project
     */
    description : string;
    /**
     * Web environments for scanning. Save array of database IDs or array of environments
     */
    environments : Environment[];
    /**
     * This project is active to perform scans
     */
    active : boolean;
  }