import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relay-inventory-main',
  templateUrl: './relay-inventory-main.component.html',
  styleUrls: ['./relay-inventory-main.component.scss']
})
export class RelayInventoryMainComponent implements OnInit {

  constructor() { }

  menu: any = [
    {
      name: 'Phiếu kiểm kê',
      route:'/admin/relay/relay-inventory/requests'
    }
  ]

  ngOnInit(): void {
  }

}
