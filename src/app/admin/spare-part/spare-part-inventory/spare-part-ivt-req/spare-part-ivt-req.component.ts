import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SparePartIvtService } from '../../services/spare-part-ivt.service';
@Component({
  selector: 'app-spare-part-ivt-req',
  templateUrl: './spare-part-ivt-req.component.html',
  styleUrls: ['./spare-part-ivt-req.component.scss'],
})
export class SparePartIvtReqComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private sparePartIvtSvc: SparePartIvtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getInventoryRequests();
  }

  jwt: any;
  isLoading: boolean = false;
  isOpenCreateRequestInventoryModal: boolean = false;
  inventoryRequests: any; // danh sách các request
  ivtReq: any = {};

  openCreateRequestInventoryModal() {
    this.ivtReq = {};
    this.ivtReq.reqNo = this.generateIvtCode(this.inventoryRequests)
    this.ivtReq.createdBy = this.jwt.Username;
    this.ivtReq.createdByName = this.jwt.FullName;
    this.isOpenCreateRequestInventoryModal = true;
  }

  getInventoryRequests() {
    this.sparePartIvtSvc.getInventoryRequests().subscribe((response) => {
      this.inventoryRequests = response.result.reverse();
    });
  }

  createInventoryRequest() {
    this.isLoading = true;

    let obj = {
      reqNo: this.ivtReq.reqNo,
      createdBy: this.ivtReq.createdBy,
      remark: this.ivtReq.remark,
      inventoryCloseDate: this.ivtReq.inventoryCloseDate,
    };

    this.sparePartIvtSvc.createInventoryRequest(obj).subscribe(
      (response) => {
        this.isLoading = false;
        this.isOpenCreateRequestInventoryModal = false;
      },
      (error) => {
        this.isLoading = false;
        this.isOpenCreateRequestInventoryModal = false;
      }
    );
  }

  /**
   * Tạo mã IVT theo định dạng: IVT-YYYYMMDD-XX
   * - YYYYMMDD: ngày hiện tại
   * - XX: số lượng dòng có createdAt bằng ngày hiện tại (định dạng 2 chữ số)
   */
  private generateIvtCode(data: any): string {
    // Lấy ngày hiện tại (giờ UTC)
    const today = new Date();

    // Lấy phần ngày (yyyy-mm-dd) từ định dạng ISO
    const todayDate = today.toISOString().split('T')[0]; // ví dụ: "2025-04-25"

    // Lọc các item có ngày createdAt trùng với ngày hiện tại
    const filteredData = data.filter((item: any) =>
      item.createdAt.startsWith(todayDate)
    );

    // Định dạng ngày theo kiểu YYYYMMDD để ghép chuỗi
    const formattedDate = todayDate.replace(/-/g, ''); // ví dụ: "20250425"

    // Chuyển số lượng thành chuỗi có ít nhất 2 chữ số (đệm số 0 nếu cần)
    const paddedCount = String(filteredData.length+1).padStart(2, '0'); // ví dụ: "03"

    // Trả về chuỗi theo định dạng yêu cầu: IVT-YYYYMMDD-XX
    return `IVT-${formattedDate}-${paddedCount}`;
  }

  redirectDetail(item: any) {
    console.log(item.data);
    this.router.navigate(
      [`admin/spare-part/spare-part-inventory-request`, `${item.data.id}`],
      { queryParams: { reqNo: item.data.reqNo } }
    );
  }
}
