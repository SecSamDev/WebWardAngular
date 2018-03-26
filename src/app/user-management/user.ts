export class User{
    id : string;
    name : string;
    email : string;
    role : number;
    manager : string;
    manager_name : string = "";
    create_date : Date;
    last_update : Date;
    status : number;
    password: string ="";
}