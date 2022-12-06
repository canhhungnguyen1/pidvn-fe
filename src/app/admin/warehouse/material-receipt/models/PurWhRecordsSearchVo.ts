export class PurWhRecordsSearchVo {
  model!: string | null;
  whUserCode!: string | null;
  // vendorCode!: string | null;
  lotNo!: string | null;
  // spoolNo!: string | null;
  fromDate!: Date | null;
  toDate!: Date | null;

  currentPage!: number;
  recordTotal!: number;
  recordStart!: number;
  recordPerPage!: number;
  slipNo!: string | null;
  invoice!: string | null;
}
