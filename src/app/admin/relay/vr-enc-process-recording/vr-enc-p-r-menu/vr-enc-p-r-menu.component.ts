import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vr-enc-p-r-menu',
  templateUrl: './vr-enc-p-r-menu.component.html',
  styleUrls: ['./vr-enc-p-r-menu.component.scss']
})
export class VrEncPRMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirectReturnWh() {
    window.open("https://10.92.176.57:8080/pur_wh_records.material_return")
  }

}
