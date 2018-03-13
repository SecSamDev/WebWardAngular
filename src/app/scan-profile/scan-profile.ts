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
    check : [string];
    /**
     * Array of identificators of the last reports of the scanner
     */
    reports : [ScanReport] | [string];
}