import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../../services/spare-part.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-spare-part-ivt-req-detail',
  templateUrl: './spare-part-ivt-req-detail.component.html',
  styleUrls: ['./spare-part-ivt-req-detail.component.scss'],
})
export class SparePartIvtReqDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  requestId: any;
  requestNo: any;
  inventoryData: any;
  isOpenScanInventoryModal: boolean = false;
  isLoadingSaveInventoryData: boolean = false;
  mapPartsScanned: Map<string, any> = new Map();
  listPartsScanned: Array<any> = new Array();

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');

    console.log(this.requestNo);

    this.getInventoryData(this.requestId);
  }

  ngAfterViewInit(): void {}

  openScanInventoryModal() {
    /**
     * Kiểm tra phiếu đã quá thời gian kiểm kê chưa
     * Đang để lớn hơn 5 ngày sẽ không cho kiểm kê
     */
    let reqDateStr = this.requestNo.split('-')[1];
    let pattern = /(\d{4})(\d{2})(\d{2})/;
    let reqDate = new Date(reqDateStr.replace(pattern, '$1-$2-$3'));
    let curDate = new Date();
    const diffTime = Math.abs(reqDate.getTime() - curDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 5) {
      this.toastr.warning('Đã quá thời gian kiểm kê', 'Warning');
      return;
    }


    this.isOpenScanInventoryModal = true;

    setTimeout(() => {
      this.labelIpt.nativeElement.focus()
    }, 500)




  }

  closeScanInventoryModal() {
    this.isOpenScanInventoryModal = false;
  }

  getInventoryData(requestId: any) {
    // this.pihInventorySvc.getInventoryData(requestId).subscribe(
    //   response => {
    //     this.inventoryData = response
    //   }
    // )
  }

  scanLabel(event: any) { 
    this.qtyIpt.nativeElement.focus()
  }

  saveListInventoryData() {
    console.log('listPartsScanned: ', this.listPartsScanned)
  }

  addToListInventoryData() {
    let qty = this.qtyIpt.nativeElement.value;
    let partNumber = this.labelIpt.nativeElement.value;
    let requestId = this.requestId;
    let whUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username; 
  
    let obj = {
      requestId: requestId,
      partNumber: partNumber,
      qty: Number(qty),
      whUserCode: whUserCode
    }


    this.mapPartsScanned.set(obj.partNumber, obj);
    this.listPartsScanned = Array.from(
      this.mapPartsScanned.values()
    ).reverse();

    this.qtyIpt.nativeElement.value = null;
    this.labelIpt.nativeElement.value  = null;

    console.log(obj)

    this.labelIpt.nativeElement.focus()
  }

  deleteLabelScanned(data: any) {
    this.mapPartsScanned.delete(data.partNumber);
    this.listPartsScanned = Array.from(this.mapPartsScanned.values()).reverse();
  }
}
