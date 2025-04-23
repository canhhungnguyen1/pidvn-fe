import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SparePartIvtService } from '../../services/spare-part-ivt.service';
import { SparePartService } from '../../services/spare-part.service';
import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-spare-part-ivt-req-detail',
  templateUrl: './spare-part-ivt-req-detail.component.html',
  styleUrls: ['./spare-part-ivt-req-detail.component.scss'],
})
export class SparePartIvtReqDetailComponent implements OnInit {
  @ViewChild('labelIpt', { static: false })
  labelIpt!: DxTextBoxComponent;
  @ViewChild('userIpt', { static: false })
  userIpt!: DxTextBoxComponent;

  @ViewChildren('qtyInput') qtyInputs!: QueryList<ElementRef>;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private sparePartIvtSvc: SparePartIvtService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');
    this.getInventoryData();
    this.getRacks();

  }

  racks: any;
  requestNo: any;
  requestId: any;
  isOpenScanInventoryModal: boolean = false;
  ivtRecord: any = {};
  isLoading: boolean = false;
  mapLabelScanned: Map<string, any> = new Map();
  listLabelScanned: Array<any> = new Array();
  labelEdit: string | null = null;
  inventoryData: any;

  getRacks() {
    this.sparePartSvc.getRacks().subscribe((response) => {
      this.racks = response;
    });
  }

  openScanInventoryModal() {
    this.isOpenScanInventoryModal = true;
    this.listLabelScanned = new Array();
    this.mapLabelScanned = new Map();
    this.ivtRecord = {};
  }

  changeRack(event: any) {
    this.selectTextInput('userIpt');
  }

  scanUser(event: any) {
    this.ivtRecord.whUserCode = event.target.value.trim().toUpperCase();
    this.selectTextInput('labelIpt');
  }

  startEdit(data: any) {
    this.labelEdit = data;
    setTimeout(() => {
      const inputToFocus = this.qtyInputs.find(
        (input, index) => this.listLabelScanned[index].partNumber === data
      );
      if (inputToFocus) {
        inputToFocus.nativeElement.focus();
        inputToFocus.nativeElement.select(); // Bôi đen text
      }
    }, 0);
  }

  stopEdit(): void {
    this.labelEdit = null;
  }

  scanLabel(event: any) {
    this.selectTextInput('labelIpt');
    let obj = {
      requestId: this.requestId,
      partNumber: event.target.value.trim().toUpperCase(),
      rack: this.ivtRecord.rack,
      createdBy: this.ivtRecord.whUserCode,
      qty: 0,
    };

    this.mapLabelScanned.set(obj.partNumber, obj);
    this.listLabelScanned = Array.from(this.mapLabelScanned.values()).reverse();
  }

  deleteLabelScanned(data: any) {
    this.mapLabelScanned.delete(data.partNumber);
    this.listLabelScanned = Array.from(this.mapLabelScanned.values()).reverse();
  }

  selectTextInput(input: string) {
    if (input === 'userIpt') {
      const inputElement = this.userIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }

    if (input === 'labelIpt') {
      const inputElement = this.labelIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }
  }

  getInventoryData() {
    this.sparePartIvtSvc.getInventoryData(this.requestId).subscribe(
      response => {
        this.inventoryData = response.result
      }
    )
  }

  saveListInventoryData() {
    console.log(this.listLabelScanned);
    this.sparePartIvtSvc.saveInventoryData(this.listLabelScanned).subscribe(
      response => {
        this.toastr.success('Lưu data thành công','Thông báo')
        this.getInventoryData();
        this.isOpenScanInventoryModal = false
      }
    )
  }
}
