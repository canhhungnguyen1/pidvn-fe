import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss']
})
export class SparePartsComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;
  
  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService
  ) {}

  spareParts: any
  isOpenAddSparePartModal: boolean = false
  isOpenPrintQRModal: boolean = false
  isConfirmLoading: boolean = false
  sparePartCreate: any = {}
  sparePartSelected: any

  ngOnInit(): void {
    this.getSpareParts();
  }


  getSpareParts() {
    this.sparePartSvc.getSpareParts().subscribe(
      response => {
        this.spareParts = response

        console.log(this.spareParts)
      }
    )
  }

  


  onExportClient(event: any) {

  }

  openAddSparePartModal() {
    this.isOpenAddSparePartModal = true;
    this.sparePartCreate = {}
  }

  onCreateSparePart() {
    this.sparePartSvc.saveSparePart(this.sparePartCreate).subscribe(
      response => {
          this.getSpareParts();
          this.isOpenAddSparePartModal = false;
          this.toastr.success('Success','OK')
      }
    )
  }



  
  openPrintQRModal() {
    this.isOpenPrintQRModal = true
    
  }

  selectedRows: any;
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
    
  }

  selectedIndex = 0
  changeTab() {
    this.selectedIndex = 1
  }

  

  

  // Hàm xử lý khi người dùng chọn tệp ảnh từ input
  handleFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.sparePartCreate.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
