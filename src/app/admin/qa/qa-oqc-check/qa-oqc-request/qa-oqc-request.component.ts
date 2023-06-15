import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaOqcService } from '../services/qa-oqc.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-qa-oqc-request',
  templateUrl: './qa-oqc-request.component.html',
  styleUrls: ['./qa-oqc-request.component.scss'],
})
export class QaOqcRequestComponent implements OnInit {
  constructor(private router: Router, private qaOqcSvc: QaOqcService) {
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
    requestDateRange: [new Date().setDate(new Date().getDate()-7), new Date()]
  }

  settingsButtonOptions: any;
  printButtonOptions: any

  isAudit: boolean = false;

  ngOnInit(): void {
    this.getConfigAudit();
    this.getOqcRequests(this.searchParams);
  }

  oqcRequests: any;

  status: any = [
    { id: 1, value: 'Chờ xử lý' },
    { id: 2, value: 'Đang xử lý' },
    { id: 3, value: 'Đã xử lý' },
  ];

  getOqcRequests(searchVo: any) {
    this.qaOqcSvc.getOqcRequests(searchVo).subscribe((response) => {
      this.oqcRequests = response;
      console.log('oqcRequests: ', this.oqcRequests);
      
    });
  }

  handleRequest(item: any) {
    console.log(item);

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
    console.log('searchParams: ', this.searchParams);
    
    this.qaOqcSvc.getOqcRequests(this.searchParams).subscribe(
      response => {
        this.oqcRequests = response
      }
    ); 
  }


  changeAuditConfig(event: any) {
    console.log('changeAuditConfig: ',event);

    let configValue = event == true ? 'TRUE' : 'FALSE';

    console.log(configValue)

    this.qaOqcSvc.changeConfigAudit(configValue).subscribe(
      response => {
        this.getOqcRequests(this.searchParams);
      }
    )
  }

  getConfigAudit() {
    this.qaOqcSvc.getConfigAudit().subscribe(
      response => {
        this.isAudit = response.configValue == 'TRUE' ? true : false
      }
    )
  }
}
