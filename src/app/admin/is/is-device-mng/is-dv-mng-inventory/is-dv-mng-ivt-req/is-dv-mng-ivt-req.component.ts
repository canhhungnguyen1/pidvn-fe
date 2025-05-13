import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IsDeviceMngService } from '../../services/is-device-mng.service'; // Adjust the path as needed

@Component({
  selector: 'app-is-dv-mng-ivt-req',
  templateUrl: './is-dv-mng-ivt-req.component.html',
  styleUrls: ['./is-dv-mng-ivt-req.component.scss'],
})
export class IsDvMngIvtReqComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private isDeviceMngSvc: IsDeviceMngService
  ) {}

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getInventoryRequests();
  }

  jwt: any;
  isLoading: boolean = false;
  ivtReq: any = {};
  inventoryRequests: any[] = [];
  isOpenCreateRequestInventoryModal: boolean = false;

  getInventoryRequests() {
    this.isDeviceMngSvc.getInventoryRequests().subscribe(
      response => {
        this.inventoryRequests = response.result.reverse();
      }
    )
  }

  redirectDetail(item: any) {}

  openCreateRequestInventoryModal() {
    this.ivtReq = {};
    this.ivtReq.requestNo = this.generateIvtCode(this.inventoryRequests);
    this.ivtReq.createdBy = this.jwt.Username;
    this.ivtReq.createdByName = this.jwt.FullName;
    this.isOpenCreateRequestInventoryModal = true;
  }

  createdInventoryRequest() {
    this.isLoading = true;
    this.isDeviceMngSvc.createInventoryRequest(this.ivtReq).subscribe(
      response => {
        this.toastr.success('Tạo phiếu kiểm kê thành công');
        this.isOpenCreateRequestInventoryModal = false;
        this.getInventoryRequests();
        this.isLoading = false;
      },
      error => {
        this.toastr.error('Tạo phiếu kiểm kê thất bại','Error');
        this.isLoading = false;
      }
    )
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
    const paddedCount = String(filteredData.length + 1).padStart(2, '0'); // ví dụ: "03"

    // Trả về chuỗi theo định dạng yêu cầu: IVT-YYYYMMDD-XX
    return `IVT-${formattedDate}-${paddedCount}`;
  }

}
