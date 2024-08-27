export class Response {
  variableId?:number;
  response?:String;

  constructor(variableId?: number, response?: string) {
    this.variableId = variableId;
    this.response = response;
}
}
