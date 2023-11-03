import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-traceability',
  templateUrl: './dashboard-traceability.component.html',
  styleUrls: ['./dashboard-traceability.component.scss'],
})
export class DashboardTraceabilityComponent implements OnInit {
  constructor() {}

  baseUrlJava = environment.baseUrlJava;

  ngOnInit(): void {
  }

  links: any = [
    {
      label: 'Trace Data',
      value: `${
        this.baseUrlJava
      }/pidvn/ma/trace/trace_data?${localStorage.getItem('token2')}`,
    },
    {
      label: 'Trace Data Detail',
      value: `${
        this.baseUrlJava
      }/pidvn/ma/trace/trace_data_detail?${localStorage.getItem('token2')}`,
    },
  ];
}
