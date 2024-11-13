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
    status!: number;
    flag!: string;
    errorInfo!: string;
    reqNo!: string;
    createdAt!: Date;
    qrCode!: string;
}