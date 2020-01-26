export class Request{
    reqId:number;
    reqUserId:number;
    reqContents:string;
    reqTypeConectId:number;
    constructor(reqId,reqUserId,reqContents,reqTypeConectId,){
        this.reqId=reqId;
        this. reqUserId=reqUserId;
        this. reqContents=reqContents;
        this. reqTypeConectId=reqTypeConectId;
    }

}


