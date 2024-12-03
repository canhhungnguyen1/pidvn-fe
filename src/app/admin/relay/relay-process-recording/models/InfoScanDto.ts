export class InfoScan {
  qaCard!: string
  model!: string;
  line!: string;
  date!: string;
  shift!: string;
  user!: string;
  processId!: number;
  processName!: string;

  // Constructor với giá trị mặc định
  constructor(
    qaCard: string = "",
    model: string = "",
    line: string = "",
    date: string = "",
    shift: string = "",
    user: string = "",
    processId: number = 0,
    processName: string = ""
  ) {
    this.qaCard = qaCard;
    this.model = model;
    this.line = line;
    this.date = date;
    this.shift = shift;
    this.user = user;
    this.processId = processId;
    this.processName = processName;
  }

  // Phương thức kiểm tra nếu tất cả thuộc tính có giá trị
  isAllPropertiesHaveValue(): boolean {
    const values = Object.values(this);
    return values.every((value) => value); // Kiểm tra tất cả các giá trị không phải falsy
  }
}
