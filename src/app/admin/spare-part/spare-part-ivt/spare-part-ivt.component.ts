import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import DataSource from 'devextreme/data/data_source';
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


  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService
  ) {}

  ngOnInit(): void {}

  onEnter(event: any): void {
    this.scannedCode = (event.target as HTMLInputElement).value;
    console.log('Enter key pressed. Scanned code:', this.scannedCode);
    let exists = (this.dataSource as unknown as DataItem[]).some(
      (item) => item.ID === this.scannedCode
    );
    if (this.scannedCode == '') {
      alert('Cần bắn NVL');
      return;
    }
    if (exists) {
      alert('Mã NVL: ' + this.scannedCode + ' đã được scan');
      return;
    } else this.getMaterialIvt(this.scannedCode);
  }

  getMaterialIvt(scannedCode: any) {
    this.sparePartSvc.getSparePartsivt().subscribe((response) => {
      const newItem = { ...response[0], ID: this.scannedCode };

      this.dataSource.push(newItem);
      this.dataSource = [...this.dataSource];
      console.log(this.dataSource);

      this.resetInput();
    });
  }

  resetInput(): void {
    this.scannedCode = ''; // Đặt lại giá trị input về chuỗi rỗng
  }

  calculateDifference(rowData: any): number {
    rowData.subtraction = rowData.default - rowData.tonkho;
    return rowData.subtraction;
  }

  customCellRender(cellElement: any, cellInfo: any) {
    const value = cellInfo.value;
    console.log(value)
    const color = value > 0 ? 'green' : value < 0 ? 'red' : 'black';
    cellElement.innerHTML = `<span style="color: ${color}">${value}</span>`;
  }


  getColor(value: number): string {
    return value > 0 ? 'green' : value < 0 ? 'red' : 'black';
  }

  
}
