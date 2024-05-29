import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }

  baseUrlJava = environment.baseUrlJava;
  relayDashboardLink!: string;

  ngOnInit(): void {

    this.relayDashboardLink = `${this.baseUrlJava}/pidvn/ma/production/dashboard`
  }



  

}
