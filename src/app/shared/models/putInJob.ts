
export class PutInJob{
    putDate:Date;
    putId:number;
    putJobId:number;
    putUserId:number;
    constructor(putDate,putId,putJobId,putUserId){
        this.putDate=putDate;
        this.putId=putId;
        this.putJobId=putJobId;
        this.putUserId=putUserId;

    }
}
