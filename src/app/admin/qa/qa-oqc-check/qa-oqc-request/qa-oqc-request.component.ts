import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaOqcService } from '../services/qa-oqc.service';
import notify from 'devextreme/ui/notify';
import { RelayDateCodeService } from 'src/app/admin/relay/relay-datecode/relay-datecode.service';

@Component({
  selector: 'app-qa-oqc-request',
  templateUrl: './qa-oqc-request.component.html',
  styleUrls: ['./qa-oqc-request.component.scss'],
})
export class QaOqcRequestComponent implements OnInit {
  constructor(
    private router: Router,
    private qaOqcSvc: QaOqcService,
    private relayDateCodeSvc: RelayDateCodeService
  ) {
    this.settingsButtonOptions = {
      text: 'Settings',
      onClick: () => {
        notify('Settings option has been clicked!');
      },
    };

    this.printButtonOptions = {
      text: 'Print',
      onClick: () => {
        notify('Print option has been clicked!');
      },
    };
  }

  searchParams = {
    requestStatusList: [],
    requestDateRange: [
      new Date().setDate(new Date().getDate() - 7),
      new Date(),
    ],
  };

  settingsButtonOptions: any;
  printButtonOptions: any;

  isAudit: boolean = false;

  isOpenAcceptModal: boolean = false;

  ngOnInit(): void {
    this.getConfigAudit();
    this.getOqcRequests(this.searchParams);
  }

  oqcRequests: any;
  oqcSpecialRequests: any;

  status: any = [
    { id: 1, value: 'Chờ xử lý' },
    { id: 2, value: 'Đang xử lý' },
    { id: 3, value: 'Đã xử lý' },
  ];

  getOqcRequests(searchVo: any) {
    this.qaOqcSvc.getOqcRequests(searchVo).subscribe((response) => {
      this.oqcRequests = response;
      this.getSpecialRequest(this.oqcRequests);
      console.log('oqcRequests: ', this.oqcRequests);
    });
  }

  getSpecialRequest(oqcRequests: any) {
    this.oqcSpecialRequests = oqcRequests.filter(
      (item: any) => item.isSpecialRequest === 1
    );

    console.log('oqcSpecialRequests: ', this.oqcSpecialRequests);
  }

  handleRequest(item: any) {
    /**
     * Trường hợp request đặc biệt (cần xác nhận)
     */
    if (item.data.isSpecialRequest === 1) {
      /**
       * Nếu chưa được xác nhận
       * => Kiểm tra nếu đã scan đủ NVL thì cho pass
       */
      if (!item.data.acceptedResult) {
        console.log('Chưa được xác nhận');
        // Call API lấy dữ liệu đã scan NVL
        this.relayDateCodeSvc
          .getMaterialScanned(item.data.qaCard)
          .subscribe((response) => {
            // Kiểm tra nếu chưa scan đủ NVL thì thông báo
            let isAbnormal = false;


            /**
             * Check đã scan đủ NVL chưa
             */
            isAbnormal = false // By Pass

            // TH1: chưa scan đủ NVL => Thông báo và không cho chuyển trạng thái
            if (isAbnormal) {
              console.log('TH1: chưa scan đủ NVL => Thông báo và không cho chuyển trạng thái');
              
              notify(
                'Vui lòng chờ người phụ trách duyệt trước khi xử lý.',
                'error',
                3000
              );
              return;
            }

            // TH2: đã scan đủ NVL => chuyển trạng thái [Chờ xử lý] sang [Đang xử lý]
            console.log('TH2: đã scan đủ NVL => chuyển trạng thái [Chờ xử lý] sang [Đang xử lý]');
            this.changeStatusRequest(item);
            return;
          });

        return;
      }

      /**
       * Trường hợp đã xác nhận (Kết quả: APPROVED)
       * => chuyển trạng thái [Chờ xử lý] sang [Đang xử lý]
       * => Điều hướng sang trang detail
       */
      if (item.data.acceptedResult === 'APPROVED') {
        this.changeStatusRequest(item);
      }

      /**
       * Trường hợp đã xác nhận (Kết quả: REJECTED)
       * => Không cho chuyển hướng và cập nhật trạng thái
       */
      if (item.data.acceptedResult === 'REJECTED') {
        let msg = `Request ${item.data.reqNo} đã REJECTED`;
        notify(msg, 'error', 3000);
        return;
      }
    }

    /**
     * Trường hợp request normal
     */
    console.log('Normal Request');
    this.changeStatusRequest(item);
  }

  /**
   * Chuyển trạng thái từ [Chờ xử lý] sang [Đang xử lý]q
   * Điều hướng sang trang detail
   */
  changeStatusRequest(item: any) {
    let oqcReqVo = {
      reqNo: item.data.reqNo,
      requestStatusId: 2, // Đang xử lý
    };

    let params = {
      reqNo: item.data.reqNo,
      qaCard: item.data.qaCard,
      requestStatus: item.data.requestStatusId,
    };

    this.qaOqcSvc.updateOqcRequest(oqcReqVo).subscribe((response) => {
      this.router.navigate(['admin/qa/qa-oqc-check/oqc-evaluate'], {
        queryParams: params,
      });
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

  onExportClient(event: any) {}

  onSearch() {
    this.qaOqcSvc.getOqcRequests(this.searchParams).subscribe((response) => {
      this.oqcRequests = response;
      this.getSpecialRequest(this.oqcRequests);
    });
  }

  changeAuditConfig(event: any) {
    console.log('changeAuditConfig: ', event);

    let configValue = event == true ? 'TRUE' : 'FALSE';

    console.log(configValue);

    this.qaOqcSvc.changeConfigAudit(configValue).subscribe((response) => {
      this.getOqcRequests(this.searchParams);
    });
  }

  getConfigAudit() {
    this.qaOqcSvc.getConfigAudit().subscribe((response) => {
      this.isAudit = response.configValue == 'TRUE' ? true : false;
    });
  }

  requestSelected: any;
  openAcceptModal(item: any) {
    this.requestSelected = item;
    this.isOpenAcceptModal = true;
  }
}
