import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';

@Component({
  selector: 'spare-part-ivt',
  templateUrl: './spare-part-ivt.component.html',
  styleUrl: './spare-part-ivt.component.scss',
})
export class SparePartIvtComponent implements OnInit {
[x: string]: any;
  value: any;
  dataSource: any;
  scannedCode: any;
  scannedcodeaf: String = '';

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService
  ) {}

  ngOnInit(): void {
  }

  onEnter(event: any): void {
    this.scannedCode = (event.target as HTMLInputElement).value;
    console.log('Enter key pressed. Scanned code:', this.scannedCode);
  
    // Xử lý mã quét sau khi nhấn Enter
    this.getMaterialIvt(this.scannedCode);
  }

  getMaterialIvt(scannedCode: any) {
    this.sparePartSvc.getSparePartsivt().subscribe((response) => {
      this.dataSource = response;
      console.log(this.dataSource);

      this.resetInput();
    });
  }

  resetInput(): void {
    this.scannedCode = ''; // Đặt lại giá trị input về chuỗi rỗng
    console.log(this.scannedCode)
  }
}
