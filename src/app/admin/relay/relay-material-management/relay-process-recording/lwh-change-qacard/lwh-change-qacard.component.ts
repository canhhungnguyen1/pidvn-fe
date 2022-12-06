import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';

@Component({
  selector: 'app-lwh-change-qacard',
  templateUrl: './lwh-change-qacard.component.html',
  styleUrls: ['./lwh-change-qacard.component.scss'],
})
export class LwhChangeQacardComponent implements OnInit, AfterViewInit {

  @ViewChild('oldQaCardIpt') oldQaCardIpt!: ElementRef;
  @ViewChild('newQaCardIpt') newQaCardIpt!: ElementRef;
  

  constructor(private toastr: ToastrService, private rePrSvc: RePrService) {}

  oldQaCard!: string;
  newQaCard!: string;

  isLoading: boolean = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.oldQaCardIpt.nativeElement.focus();
  }

  changeQACard() {
    if (!this.oldQaCard || !this.newQaCard || (this.oldQaCard == this.newQaCard)) {
      this.toastr.warning('Mã QA Card không hợp lệ', 'Warning');
      return;
    }
    this.isLoading = true;
    this.rePrSvc
      .changeQaCard(this.oldQaCard, this.newQaCard)
      .subscribe((response) => {
        this.toastr.success('Chuyển QA Card thành công !','Success');
        console.log('DATA CHANGE QA CARD', response);
        this.oldQaCard = '';
        this.newQaCard = '';
        this.isLoading = false;
      });
  }

  scanOldQaCard(event: any) {
    this.newQaCardIpt.nativeElement.focus();
  }

}
