import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReWhService } from '../services/re-wh.service';

@Component({
  selector: 'app-re-wh-requests',
  templateUrl: './re-wh-requests.component.html',
  styleUrls: ['./re-wh-requests.component.scss'],
})
export class ReWhRequestsComponent implements OnInit {
  constructor(private router: Router, private reWhSvc: ReWhService) {}

  slips: any;

  ngOnInit(): void {
    this.getListPXK();
  }

  getListPXK() {
    this.reWhSvc.getSlips().subscribe((response) => {
      this.slips = response;
      console.log('PXK: ', this.slips);
    });
  }

  onRowClick(event: any) {
    this.router.navigate([
      `admin/relay/material-management/re-wh-requests/${event.data.slipNo}`,
    ]);
  }
}
