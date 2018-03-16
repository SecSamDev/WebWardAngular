/**
 * Show deployment status
 */
export class KubeDeployment {
    name : string;
    desired : number;
    current : number;
    up_to_date : number;
    available : number;
    age : number;
}