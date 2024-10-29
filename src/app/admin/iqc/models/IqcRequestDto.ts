import { IqcResultDto } from "./IqcResultDto"

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
    classParam!: string | any
    iqcResults!: IqcResultDto []
    lotGroups!: string [] 
    lotNos!: string []
}