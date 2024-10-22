export class IqcRequestDto {
    id!: number
    requestNo!: string
    invoice!: string
    status!: number
    supplier!: string
    requestedBy!: string
    remark!: string
    createdAt!: Date;
    updatedAt!: Date;
}