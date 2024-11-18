export class LotDto {
    model!: string;
    lotNo!: string;
    lotGroup!: string;
    recordType!: string;
    firstQty!:number;
    qty!:number;
    remainQty!: number
    date!: Date;
    receiver!: string;
    sender!:string;
    whUserCode!:string;
    status!: number;
    flag!: string;
    errorInfo!: string;
    reqNo!: string | null
    createdAt!: Date;
    updatedAt!: Date;
    qrCode!: string;
    parent!: string;
    qaCard!:string;
    line!: string;
    shift!: string;
}