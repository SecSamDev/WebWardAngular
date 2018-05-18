import {ScanReport} from '../scan-report/scan-report';

export class ScanProfile{
    /**
     * Identification in the DB
     */
    id : string;
    /**
     * Name of the scan Profile. Ej: Fast Development
     */
    name : string;
    /**
     * Description of the Scanner Profile
     */
    description : string;
    /**
     * Array of vulenrabilities to check
     */
    checks : string[] = [];
}