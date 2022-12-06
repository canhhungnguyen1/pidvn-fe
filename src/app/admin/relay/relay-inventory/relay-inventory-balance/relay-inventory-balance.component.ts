import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RelayInventoryService } from '../services/relay-inventory.service';

@Component({
  selector: 'app-relay-inventory-balance',
  templateUrl: './relay-inventory-balance.component.html',
  styleUrls: ['./relay-inventory-balance.component.scss'],
})
export class RelayInventoryBalanceComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private reIvtSvc: RelayInventoryService,
    public activatedRoute: ActivatedRoute
  ) {}

  isShowSpin: boolean = true;
  balances: any;
  ivtReq: any;
  inventories: any;

  ngOnInit(): void {
    this.getInventoryRequest();
    this.getBalances();
  }

  getBalances() {
    let reqId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.reIvtSvc.getBalances(reqId).subscribe(
      response => {
        this.isShowSpin = false;
        this.balances = response
      }
    )
  }

  getInventoryRequest() {
    let reqId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.reIvtSvc.getInventoryRequest(reqId).subscribe(
      response => {
        this.ivtReq = response;
        this.getInventories();
      }
    )
  }

  getInventories() {
    this.reIvtSvc.getRelayInventories(this.ivtReq.reqNo).subscribe(
      response => {
        this.inventories = response;
      }
    )
  }

  onExportBalance(event: any) {

  }

  onExportInventory(event: any) {}
}
