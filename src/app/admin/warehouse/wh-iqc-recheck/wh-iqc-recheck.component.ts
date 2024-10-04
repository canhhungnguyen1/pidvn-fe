import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { WhIqcRecheckService } from './services/wh-iqc-recheck.service';

@Component({
  selector: 'app-wh-iqc-recheck',
  templateUrl: './wh-iqc-recheck.component.html',
  styleUrl: './wh-iqc-recheck.component.scss'
})
export class WhIqcRecheckComponent implements OnInit {

  @ViewChild('qrIpt') qrIpt!: ElementRef;

  ngOnInit(): void {
  }


  isOpenCreateIqcRequestModal = false;

  constructor(
    private toastr: ToastrService,
    private whIqcRecheckSvc: WhIqcRecheckService,
    private jwtHelperSvc: JwtHelperService
  ) { }

  labelScannedSet = new Set();
  labelScannedArr: Array<any> = new Array();


  openCreateIqcRequestModal() {
    this.isOpenCreateIqcRequestModal = true
  }

  scanLabel(event: any) {
    let labelValue = event.target.value.toUpperCase();

    /**
     * Trường hợp tem thung to
     */
    if (labelValue.split(';')[0] === 'B') {
      
      let labelDto = {labelType: 'ParentLabel', qrCode: labelValue}
      
      this.whIqcRecheckSvc.scanLabel(labelDto).subscribe(
        response => {
          this.labelScannedSet.add(response.result)
          this.labelScannedArr = [...Array.from(this.labelScannedSet).reverse()];


          console.log(this.labelScannedArr);
          
        }
      )

      return
    }

    /**
     * Trường hợp tem Elektrisola
     */
    if (labelValue.split(';')[4] === '21010284') {
      let labelDto = {labelType: 'Elektrisola', qrCode: labelValue}
      
      this.whIqcRecheckSvc.scanLabel(labelDto).subscribe(
        response => {
          this.labelScannedSet.add(response.result)
          this.labelScannedArr = [...Array.from(this.labelScannedSet).reverse()];


          console.log(this.labelScannedArr);
          
        })
      return
    }

    console.log('Children Label');

    this.qrIpt.nativeElement.select();
  }


}
