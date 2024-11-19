import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-re-wh-menu',
  templateUrl: './re-wh-menu.component.html',
  styleUrls: ['./re-wh-menu.component.scss']
})
export class ReWhMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // admin/relay/material-management/re-wh-requests
  menu: any = [
    {
      name: 'Nhận NVL từ kho PUR-WH',
      route:'/admin/relay/relay-process-recording/requests'
    },
    {
      name: 'Trả NVL về kho PUR-WH',
      route:'/admin/relay/material-management/rwh-send-pwh'
    },
    {
      name: 'Chuyển NVL vào xe NVL (LINE-WH)',
      route:'/admin/relay/material-management/rwh-send-lwh'
    },
    {
      name: 'Kho trung chuyển (RE-WH) nhận NVL từ LINE trả',
      route:'/admin/relay/material-management/rwh-receive-lwh'
    },
    {
      name: 'Thống kê NVL',
      route:'/admin/relay/material-management/relay-material-traceability'
    },
    {
      name: 'Kiểm kê NVL',
      route:'/admin/relay/relay-inventory/main'
    },
    {
      name: 'Nhận NVL từ kho PUR-WH (IT đang test Version 2)',
      route:'/admin/relay/relay-process-recording/requests'
    },
  ]
}
