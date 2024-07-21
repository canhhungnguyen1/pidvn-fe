export class ProjectProgressDto {
    id!:number
    projectProgressId!: number;
    projectProgressName!: string;
    projectId!: number;
    progress!: number;
    startPlan: Date | any;
    endPlan!: Date | any;
    createdAt!: Date;
    updatedAt!: Date;
}