import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-spare-part-in-out',
  templateUrl: './spare-part-in-out.component.html',
  styleUrls: ['./spare-part-in-out.component.scss'],
})
export class SparePartInOutComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getSparePartRecords();
    this.getSpareParts();
    this.getUsers();
  }

  users: any;
  sparePartRecords: any;
  spareParts: any;
  isOpenInOutModal: boolean = false;
  titleInOutModal: string = '';
  sparePartRecordType: any;
  sparePartRecord!: SparePartRecordVo;
  isLoading: boolean = false;

  getUsers() {
    this.sparePartSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getSpareParts() {
    this.sparePartSvc.getSpareParts().subscribe((response) => {
      this.spareParts = response;
    });
  }

  getSparePartRecords() {
    this.sparePartSvc.getSparePartRecords().subscribe((response) => {
      this.sparePartRecords = response;
    });
  }

  saveSparePartRecord() {

    this.isLoading = true;
    
    
    this.sparePartRecord.whUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.sparePartRecord.type = this.sparePartRecordType == 'IN' ? 'NK' : 'XK'
    

    this.sparePartSvc.saveSparePartRecord(this.sparePartRecord).subscribe(
      response => {
        this.toastr.success('OK','Success')
        console.log('sparePartRecord: ', response)
        this.isOpenInOutModal = false;
        this.isLoading = false;
        this.getSparePartRecords();
      }
    )
  }

  openInOutModal(type: any) {

    this.sparePartRecord = new SparePartRecordVo();


    this.sparePartRecordType = type;
    this.titleInOutModal =
      type == 'IN' ? 'Nhập kho Spare Part' : 'Xuất kho Spare Part';
    this.isOpenInOutModal = true;
  }

  onExportClient(event: any) {}
}
