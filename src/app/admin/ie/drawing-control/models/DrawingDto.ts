export class DrawingDto {
    id!: number
    parentId!: string
    drawingNo!: string
    drawingName!: string
    qty!: number
    unit!: string
    material!: string
    hardness!: string
    polishing!: string
    supplier!: string
    version!: string
    remark!: string
    projectId!: number
    projectProgressId!: number
    createdAt!: Date | any
    updatedAt!: Date | any
}