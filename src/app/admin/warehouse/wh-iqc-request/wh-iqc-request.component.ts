import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { WhIqcRequestService } from './services/wh-iqc-request.service';

@Component({
  selector: 'app-wh-iqc-request',
  templateUrl: './wh-iqc-request.component.html',
  styleUrls: ['./wh-iqc-request.component.scss'],
})
export class WhIqcRequestComponent implements OnInit {

  @ViewChild('qrIpt') qrIpt!: ElementRef;

  iqcRequestDetails: any;
  iqcRequests: any;
  isOpenIqcRequestModal: boolean = false;
  isOpenIqcDetailModal: boolean = false;
  searchVo: any = {};
  iqcRequest: any = {};
  invoices: any;
  iqcRequestSelected: any;
  slipNos: any;

  isOpenIqcRequestCreateSortingModal: boolean = false;
  labelScannedSet = new Set();
  labelScannedArr: Array<any> = new Array();

  iqcDataSortingInfo: any;
  requestType: any;

  constructor(
    private toastr: ToastrService,
    private whIqcSvc: WhIqcRequestService,
    private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.getIQCRequests();
    this.getInvoices(); 
  }

  onSearch() {
    console.log('SearchVo: ', this.searchVo);
    this.getIQCRequests();
  }

  getInvoices() {
    this.whIqcSvc.getInvoices().subscribe((response) => {
      this.invoices = response;
    });
  }

  getSlipNoByInvoice(invoice: string) {
    this.whIqcSvc.getSlipNoByInvoice(invoice).subscribe(
      response => {
        this.slipNos = response;
        // this.iqcRequest.requestNo = response.slipNo;
      }
    )
  }

  getIQCRequests() {
    this.whIqcSvc.getIqcRequests(this.searchVo).subscribe((response) => {
      console.log(response);
      this.iqcRequests = response;
    });
  }

  /*showDetail(item: any) {
    console.log('Item : ', item);
    
    this.whIqcSvc.getIqcRequestDetail(item.requestNo, item.invoice).subscribe((response) => {
      this.isOpenIqcRequestModal = true;
      this.iqcRequestDetails = response;
    });
  }*/

  createIqcRequest() {
    // Validate input
    if (!this.iqcRequest?.requestNo || !this.iqcRequest?.invoice || !this.iqcRequest?.supplier) {
      this.toastr.warning('Cần nhập đủ thông tin !', 'Warning');
      return;
    }

    let requestedBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.iqcRequest.requestedBy = requestedBy;

    this.whIqcSvc.createIqcRequest(this.iqcRequest).subscribe((response) => {
      this.toastr.success('Đã tạo request IQC', 'Success');
      this.getIQCRequests();
      this.isOpenIqcRequestModal = false;
    });
  }

  openIqcDetailModal(data: any) {

    this.iqcRequestSelected = { ...data };

    console.log(this.iqcRequestSelected);


    // Trường hợp nếu là request sorting




    if(this.iqcRequestSelected.type === 'sorting') {

      this.whIqcSvc.getIqcDataSortingInfo(this.iqcRequestSelected.requestNo).subscribe(
        response => {
          this.isOpenIqcDetailModal = true;
          this.iqcDataSortingInfo = response;
          console.log('iqcDataSortingInfo: ', this.iqcDataSortingInfo)
        }
      )

      return;
    }
    

    let searchVo = {
      invoice: data.invoice,
      requestNo: data.requestNo,
    }

    this.whIqcSvc.getIqcRequestDetail(searchVo.requestNo, searchVo).subscribe((response) => {
      this.iqcRequestDetails = response;
      this.isOpenIqcDetailModal = true;
    });









  }

  onChangeInvoice(data: any) {
    if (!data) {
      this.iqcRequest.requestNo = null
      return;
    }

    this.getSlipNoByInvoice(data);
  }

  // Handle date picker
  onChange(result: any): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }



  scanLabel(event: any) {
    let labelValue = event.target.value.toUpperCase();
    
    this.qrIpt.nativeElement.select();

    /**
     * Có 2 TH: Elektrisola & Tem tự in
     */

    let dataSplit = labelValue.split(';')

    if(dataSplit.length >= 5 && dataSplit[4] === '21010284') {

      this.handleScanElektrisola(dataSplit);

      return;
    }

    
    this.labelScannedSet.add(`${dataSplit[3]}`)
    this.labelScannedArr = [...Array.from(this.labelScannedSet).reverse()];
    return;

  }


  handleScanElektrisola(dataSplit: any) {
    this.labelScannedSet.add(`${dataSplit[3]}${dataSplit[5]}`)
    this.labelScannedArr = [...Array.from(this.labelScannedSet).reverse()];
  }




  createIqcSortingRequest() {
    this.whIqcSvc.createIqcRequestSorting(this.labelScannedArr, this.requestType).subscribe(
      response => {
        this.isOpenIqcRequestCreateSortingModal = false;
        this.toastr.success('Đã tạo request IQC', 'Success');
        this.getIQCRequests();
        this.labelScannedSet = new Set();
        this.labelScannedArr = new Array();
      }
    )
  }

  deleteLabelScanned(event: any) {
    this.labelScannedSet.delete(event);
    this.labelScannedArr = [...Array.from(this.labelScannedSet).reverse()];
  }


  closeIqcRequestCreateSortingModal() {
    
    this.isOpenIqcRequestCreateSortingModal = false;

    this.labelScannedSet = new Set();
    this.labelScannedArr = new Array();

  }

  
  openIqcRequestCreateSortingModal(type: any) {
    this.isOpenIqcRequestCreateSortingModal = true;
    this.requestType = type

    console.log('type: ', type);
  }

}
