import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { WhIqcRecheckService } from './services/wh-iqc-recheck.service';
import { LotDto } from './models/LotDto';
import { RequestDto } from './models/RequestDto';

@Component({
  selector: 'app-wh-iqc-recheck',
  templateUrl: './wh-iqc-recheck.component.html',
  styleUrl: './wh-iqc-recheck.component.scss',
})
export class WhIqcRecheckComponent implements OnInit {
  @ViewChild('qrIpt') qrIpt!: ElementRef;

  ngOnInit(): void {}

  isOpenCreateIqcRequestModal = false;

  constructor(
    private toastr: ToastrService,
    private whIqcRecheckSvc: WhIqcRecheckService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  iqcLots: Array<any> = new Array();

  openCreateIqcRequestModal() {
    this.isOpenCreateIqcRequestModal = true;
  }

  // Hàm thêm một mảng đối tượng vào mảng có sẵn mà không trùng nhau
  private addUniqueObjects(newObjects: LotDto[], existingArray: LotDto[]): void {
    newObjects.forEach((newObj) => {
      const isExist = existingArray.some(existingObj => existingObj.lotNo === newObj.lotNo);
      if (!isExist) {
        existingArray.push(newObj);
      }
    });
  }

  scanLabel(event: any) {
    let labelValue = event.target.value.toUpperCase();

    /**
     * Trường hợp tem thùng to
     */
    if (labelValue.split(';')[0] === 'B') {
      let labelDto = { labelType: 'ParentLabel', qrCode: labelValue };

      this.whIqcRecheckSvc.scanLabel(labelDto).subscribe((response) => {
        this.addUniqueObjects(response.result, this.iqcLots);
        this.iqcLots.reverse();
        this.qrIpt.nativeElement.select();
      });

      return;
    }

    /**
     * Trường hợp tem Elektrisola
     */
    if (labelValue.split(';')[4] === '21010284') {
      let labelDto = { labelType: 'Elektrisola', qrCode: labelValue };

      this.whIqcRecheckSvc.scanLabel(labelDto).subscribe((response) => {
        this.addUniqueObjects(response.result, this.iqcLots);
        this.iqcLots.reverse();
        this.qrIpt.nativeElement.select();
      });
      return;
    }

    console.log('Children Label');
    
    let labelDto = { labelType: 'ChildrenLabel', qrCode: labelValue };
    this.whIqcRecheckSvc.scanLabel(labelDto).subscribe((response) => {
      this.addUniqueObjects(response.result, this.iqcLots);
      this.iqcLots.reverse();
      this.qrIpt.nativeElement.select();
    });
    return;

  }


  createRequest() {

    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let requestDto = new RequestDto();
    requestDto.lots = this.iqcLots
    requestDto.requestedBy = username
    requestDto.type = "6Month"

    this.whIqcRecheckSvc.createIqcRequest(requestDto).subscribe(
      response => {
        this.iqcLots = new Array();
        this.isOpenCreateIqcRequestModal = false;
      }
    )
  }

}
