export class SearchDto {
    date: Date = new Date();
    projectTypeId!: number;
    productId!:number;
    personInChargeId!:string;
    personInChargeIdList!: string[]
}