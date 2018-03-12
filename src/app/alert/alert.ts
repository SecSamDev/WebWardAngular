export class Alert {
    type: number;
    msg: string;
  }
  export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}