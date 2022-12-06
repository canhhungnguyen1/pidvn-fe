import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SearchParams } from '../../../models/SearchParams';
import { MeasurementService } from '../../../services/measurement.service';

@Component({
  selector: 'app-mea-mng-edit-type1',
  templateUrl: './mea-mng-edit-type1.component.html',
  styleUrls: ['./mea-mng-edit-type1.component.scss'],
})
export class MeaMngEditType1Component implements OnInit {
  @Input() item!: any;
  @Input() masterData!: any;
  @Input() standard!: any;
  @Output() approveEmit = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private measureService: MeasurementService,
    private jwtHelperService: JwtHelperService
  ) {}

  detailsData!: any[];
  valueNames!: any[];
  isApprove = false;
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  isLoading: boolean = false;

  ngOnInit(): void {
    console.log('AAAAAAA: ', this.standard)
    this.valueNames = this.standard.valueName.split(';');
    this.masterData.approvedBy !== null
      ? (this.isApprove = true)
      : (this.isApprove = false);
    this.getDetailData(this.masterData.id);
  }

  getDetailData(masterId: number) {
    let searchParam = new SearchParams();
    searchParam.master = masterId;

    this.measureService.getDetailData(searchParam).subscribe((response) => {
      this.detailsData = response;
      this.updateEditCache();
    });
  }

  confirmApprove() {
    let approver = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.measureService
      .approveData(this.masterData.id, approver)
      .subscribe((response) => {
        this.isApprove = !this.isApprove;
        this.toastr.success('Approved !');
        this.approveEmit.emit();
      });
  }

  // TODO : Edit data
  startEdit(id: string): void {
    if (this.masterData.approvedBy != null) {
      this.toastr.warning('Không thể sửa khi đã Approve !');
      return;
    }
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.detailsData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.detailsData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.detailsData.findIndex((item) => item.id === id);
    let detail = this.detailsData[index];
    let edit = this.editCache[id].data;

    Object.assign(detail, edit);
    this.editCache[id].edit = false;
  }

  commitDataChange() {
    this.isLoading = true;
    console.log('Data change = ', this.detailsData);
    this.measureService
      .updateDetailData(this.detailsData)
      .subscribe((response) => {
        this.isLoading = false;
        this.toastr.success('Saved !');
        console.log('Edit Response : ', response);
        this.getDetailData(this.masterData.id);
      });
  }

  updateEditCache(): void {
    this.detailsData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
