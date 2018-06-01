export class ThreatModel{
    /**
     * Id in DB
     */
    id : string
    /**
     * ProjectID of this report
     */
    project : string;
    /**
     * Name of the project
     */
    projectName : string;
    /**
     * Name of the threat model
     */
    name : string;
    /**
     * General description of the aplication
     */
    description : string;
    /**
     * Aplication type: WebPage, WebService, WebApp, eCommerce
     */
    applicationType = "WebPage";
    /**
     * Owner of the Threat Model
     */
    owners = [];
    /**
     * Authors
     */
    authors = [];
    /**
     * Involved people
     */
    stakeholders = [];
    /**
     * URL of the WebAPP
     */
    url : string;
    /**
     * Document version
     */
    version : number = 1;
    /**
     * Revision of the version
     */
    review : number = 1;
    /**
     * System dependencies
     */
    system = [];
    /**
     * Libraries
     */
    platform = [];
    /**
     * File for the Threat Model
     */
    threatModelFile : string;
    /**
     * File for the report
     */
    threatModelReport : string;
    /**
     * Creation Date
     */
    create_date : Date;
    /**
     * Last Update
     */
    last_update : Date;
}