import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';

@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss']
})
export class SparePartsComponent implements OnInit {


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

  openPrintQRModal(item: any) {
    this.isOpenPrintQRModal = true
    this.sparePartSelected = item.data
    console.log('AAA: ', this.sparePartSelected);
    
  }

}
