export class IqcRequestDto {
    id!: number
    requestNo!: string
    invoice!: string
    slipNo!: string
    status!: number
    statusName!: string;
    supplier!: string
    requestedBy!: string
    requestedByName!: string;
    requestedById!: number;
    remark!: string
    createdAt!: Date
    updatedAt!: Date
    type!: string
}