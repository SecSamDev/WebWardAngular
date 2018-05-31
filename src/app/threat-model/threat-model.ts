export class ThreatModel{
    id : string
    name : string;
    description : string;
    aplicationType = "Web";
    owners = [];
    authors = [];
    stakeholders = [];
    url : string;
    version : number = 0;
    system = [];
}

export class ThreatAttack{
    active : boolean;
    scope : string;

}