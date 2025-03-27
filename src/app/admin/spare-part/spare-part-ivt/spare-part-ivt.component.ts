import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import DataSource from 'devextreme/data/data_source';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzIconService } from 'ng-zorro-antd/icon';
import { HomeOutline } from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
interface DataItem {
  ID: number;
  name: string;
}
@Component({
  selector: 'spare-part-ivt',
  templateUrl: './spare-part-ivt.component.html',
  styleUrls: ['./spare-part-ivt.component.scss'],
})
@Injectable({
  providedIn: 'root', // Hoặc module providers
})
export class SparePartIvtComponent implements OnInit {
  [x: string]: any;
  value: any;
  dataSource: DataSource[] = [];
  scannedCode: any;
  scannedcodeaf: String = '';
  date_time: any;
  tooljig_no: String = '';
  username: String = '';
  userId: String = '';

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên +1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.date_time = `${year}-${month}-${day}`;
    let date_time_fm = `${year}${month}${day}${hours}${minutes}`;
    console.log(this.date_time);

    this.username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.userId = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    this.get_tooljig_no(date_time_fm);
  }

  get_tooljig_no(date_time_fm: string) {
    this.tooljig_no = 'TJIVT' + '_' + date_time_fm;
  }

  onEnter(event: any): void {
    this.scannedCode = (event.target as HTMLInputElement).value;
    console.log('Enter key pressed. Scanned code:', this.scannedCode);
    let exists = (this.dataSource as unknown as DataItem[]).some(
      (item) => item.name === this.scannedCode
    );
    if (this.scannedCode == '') {
      this.toastr.warning('Bạn cần Scan NVL', 'warning');
      return;
    }
    if (exists) {
      this.toastr.error(
        'Mã NVL: ' + this.scannedCode + ' đã được scan',
        'error'
      );
      return;
    } else this.getMaterialIvt(this.scannedCode);
  }

  getMaterialIvt(scannedCode: any) {
    this.sparePartSvc
      .getSparePartsivt(this.scannedCode)
      .subscribe((response) => {
        console.log(response);
        if (response.length == 0) {
          this.toastr.error(scannedCode + '(Mã code không tồn tại!)', 'error');
          this.resetInput();
          return;
        } else {
          const newItem = {
            ...response[0],
            ID: this.dataSource.length + 1,
            date_time: this.date_time,
            ivt_no: this.tooljig_no,
            username: this.username,
            updated_at: this.date_time,
          };
          this.dataSource.push(newItem);
          this.dataSource = [...this.dataSource];
          console.log(this.dataSource);

          this.resetInput();
        }
      });
  }

  resetInput(): void {
    this.scannedCode = ''; // Đặt lại giá trị input về chuỗi rỗng
  }

  calculateDifference(rowData: any): number {
    rowData.ivt_dif = rowData.current - rowData.tonkho;
    return rowData.ivt_dif;
  }

  customCellRender(cellElement: any, cellInfo: any) {
    const value = cellInfo.value;
    console.log(value);
    const color = value > 0 ? 'green' : value < 0 ? 'red' : 'black';
    cellElement.innerHTML = `<span style="color: ${color}">${value}</span>`;
  }

  getColor(value: number): string {
    return value > 0 ? 'green' : value < 0 ? 'red' : 'black';
  }

  Save_data() {
    this.sparePartSvc.saveSparePartIvt(this.dataSource).subscribe(
      (response: any) => {
        this.toastr.success('Lưu Thành Công', 'success');
        console.log('Data saved successfully', response); // Xử lý dữ liệu trả về từ API
      },
      (error: any) => {
        console.error('Error saving data', error); // Xử lý lỗi khi gọi API
      }
    );
    this.reloadPage()
  }

  confirm() {
    if (this.dataSource.length > 0) {
      this.modal.confirm({
        nzTitle: 'Bạn có muốn lưu?',
        nzContent: 'Bạn có chắc chắn muốn lưu mục này?',
        nzOnOk: () => {
          this.Save_data();
        },
        nzOnCancel: () => console.log('Hủy Bỏ!'),
      });
    } else {
      this.toastr.warning('Bạn Cần Scan NVL!', 'warning');
      return;
    }
  }

  back_to_ivt() {
    this.router.navigate(['/admin/spare-part/spare-part-ivt-his']);
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
      // Gọi API tại đây nếu cần
    }, 3000);
    
  }

}
