import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';

@Component({
  selector: 'app-relay-mapping-qacard',
  templateUrl: './relay-mapping-qacard.component.html',
  styleUrls: ['./relay-mapping-qacard.component.scss'],
})
export class RelayMappingQacardComponent implements OnInit {
  @ViewChild('parentQaCardIpt') parentQaCardIpt!: ElementRef;
  @ViewChild('childQaCardIpt') childQaCardIpt!: ElementRef;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;

  constructor(private rePrSvc: RePrService, private toastr: ToastrService) {}
  processes = new Array();
  processId: any;
  qaCards = new Array();
  parentQaCard!: string;
  childQaCard!: string;
  isVisibleModal: boolean = false;
  qty!: number | null;

  getProcesses() {
    this.rePrSvc.getProcesses().subscribe((response) => {
      for (const item of response) {
        if (/^WIP-/.test(item.name)) {
          this.processes.push(item);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getProcesses();
    setTimeout(() => {
      this.parentQaCardIpt.nativeElement.focus();
    }, 0);
  }

  scanInspectQACard(event: any) {
    // Validate Inspect QA card

    console.log(event.target.value);

    if (!event.target.value) {
      this.toastr.warning('Cần scan Parent QA Card', 'Warning');
      return;
    }

    this.parentQaCard = event.target.value;

    // Lấy dữ liệu theo Inspect QA Card

    this.rePrSvc.getChildQaCards(this.parentQaCard).subscribe((response) => {
      this.qaCards = response;
      this.childQaCardIpt.nativeElement.select();
    });
  }

  scanChildQACard(event: any) {
    if (!event.target.value) {
      this.toastr.warning('Cần scan Child QA Card', 'Warning');
      return;
    }

    this.childQaCard = event.target.value;

    if (!this.isOkModelQACard(this.parentQaCard, this.childQaCard)) {
      this.childQaCardIpt.nativeElement.select();
      return;
    }

    this.isVisibleModal = true;
  }

  scanProcess(event: any) {}

  isOkModelQACard(parentQaCard: string, childQaCard: string): boolean {
    let modelParentQaCard = parentQaCard.split('*')[0];
    let modelChildQaCard = childQaCard.split('*')[0];

    if (modelParentQaCard !== modelChildQaCard) {
      this.toastr.warning('Sai mã Model', 'Warning');
      return false;
    }

    return true;
  }

  deleteQACard(data: any) {
    console.log('Delete: ', data);
    this.rePrSvc.deleteChildQaCard(data.id).subscribe((response) => {
      this.toastr.success(data.qaCard, 'Đã xóa');
      this.rePrSvc.getChildQaCards(this.parentQaCard).subscribe((response) => {
        this.qaCards = response;
        this.childQaCardIpt.nativeElement.select();
      });
    });
  }

  handleSave() {

    if (this.parentQaCard == this.childQaCard) {
      this.toastr.warning('QA Card bị trùng','Warning')
      return;
    }

    let obj = {
      plotno: this.parentQaCard,
      clotno: this.childQaCard,
      qty: this.qty,
      processId: this.processId,
    };

    this.rePrSvc.mappingQaCard(obj).subscribe((response) => {
      this.toastr.success('Lưu thành công', 'Success');
      this.isVisibleModal = false;
      this.qty = null;
      this.parentQaCardIpt.nativeElement.select();
      this.childQaCard = '';
      this.processId = null;

      this.getChildQaCards();
    });
  }

  getChildQaCards() {
    this.rePrSvc.getChildQaCards(this.parentQaCard).subscribe((response) => {
      this.qaCards = response;
    });
  }

  handleCancel() {
    this.isVisibleModal = false;
    this.qty = null;
    this.processId = null;
    this.childQaCardIpt.nativeElement.select();
  }
}
