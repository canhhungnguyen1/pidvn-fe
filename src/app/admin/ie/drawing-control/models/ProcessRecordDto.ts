export class ProcessRecordDto {
  id!: number;
  projectId!: number;
  processId!: number;
  processName!: string;
  content!: string;
  startPlan!: Date | any;
  endPlan!: Date | any;
  startAction!: Date | any;
  endAction!: Date | any;
  progressPercent!: number
}
