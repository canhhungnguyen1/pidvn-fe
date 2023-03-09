import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { QaOqcService } from 'src/app/admin/qa/qa-oqc-check/services/qa-oqc.service';
import { RelayDateCodeService } from 'src/app/admin/relay/relay-datecode/relay-datecode.service';
import { PackingOqcRequestService } from '../services/packing-oqc-request.service';

@Component({
  selector: 'app-packing-oqc-request-list',
  templateUrl: './packing-oqc-request-list.component.html',
  styleUrls: ['./packing-oqc-request-list.component.scss'],
})
export class PackingOqcRequestListComponent implements OnInit {
  isOpenModal: boolean = false;

  isOpenDetailModal: boolean = false;

  constructor(
    private reDateCodeSvc: RelayDateCodeService,
    private qaOqcSvc: QaOqcService,
    private packingOqcRequestSvc: PackingOqcRequestService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  oqcRequests: any;

  qaCard: any;
  qaCards: any;

  dateCodes: any;
  errorCreateRequestMsg: string | null = null;

  qaCardInfo = {
    model: null,
    line: null,
    date: null,
    shift: null,
    value: null,
  };

  priority: any = 2;

  ngOnInit(): void {
    this.getOqcRequests({});
  }

  getOqcRequests(filter: any) {
    this.qaOqcSvc.getOqcRequests(filter).subscribe((response) => {
      this.oqcRequests = response;
    });
  }

  handleCancel() {
    this.isOpenModal = false;
    this.qaCardInfo.date = null;
    this.qaCardInfo.line = null;
    this.qaCardInfo.model = null;
    this.qaCardInfo.shift = null;
    this.qaCardInfo.value = null;
    this.qaCard = null;
    this.errorCreateRequestMsg = null;
    this.dateCodes = null;
    this.priority = 2;
  }

  createOqcRequest() {
    let obj = {
      qaCard: this.qaCard,
      priority: this.priority,
      createdBy: this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username,
    };

    this.packingOqcRequestSvc.createOqcRequest(obj).subscribe((response) => {
      console.log(response);

      if (response.status == 'ERROR') {
        this.errorCreateRequestMsg = response.messages;

        return;
      }

      // TODO
      this.getOqcRequests({});
      this.handleCancel();
      this.toastr.success('Thành công', 'Success');
    });
  }

  openModal() {
    this.getQaCards();
    this.isOpenModal = true;
  }

  selectQaCard(event: any) {
    let data = event;
    this.qaCardInfo.value = data;
    let arr = data.split('*');

    this.qaCardInfo.model = arr[0];
    this.qaCardInfo.line = arr[1];
    this.qaCardInfo.date = arr[2];
    this.qaCardInfo.shift = arr[3];

    this.getDateCodes(data);
  }

  getDateCodes(qaCard: string | null) {
    this.reDateCodeSvc.getDateCodes(qaCard).subscribe((response) => {
      this.dateCodes = response;
    });
  }

  getQaCards() {
    this.reDateCodeSvc.getQACards().subscribe((response) => {
      this.qaCards = response;
    });
  }

  onRowPrepared(event: any) {
    if (event.rowType === 'data') { 
      if (event.key.judgment === 'NG') {
        event.rowElement.style.backgroundColor = 'red';
          // or
          event.rowElement.classList.add('my-class');
          // to override alternation color
          event.rowElement.className = event.rowElement.className.replace(
            'dx-row-alt',
            ''
          );
      }
    }
  }
}
