export class ScanReport{
    /**
     * Identification in the DB
     */
    id : string;
    /**
     * Name of the report
     */
    name : string;
    /**
     * Report data
     */
    data : any ={};
    /**
     * Project ID of the report
     */
    project : string;
    /**
     * Date of start
     */
    create_date : Date;
    /**
     * today-create_date
     */
    daysAgo : number;
    /**
     *  Reporter of the scan
     */
    reporter : string;
}
/**
 * WAPPALYZER Categories:
 * 
 * 
 */