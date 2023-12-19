import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VrEncPRService } from '../services/vr-enc-p-r.service';
import { error } from 'console';

@Component({
  selector: 'app-vr-enc-p-r-insert',
  templateUrl: './vr-enc-p-r-insert.component.html',
  styleUrls: ['./vr-enc-p-r-insert.component.scss'],
})
export class VrEncPRInsertComponent implements OnInit, AfterViewInit {
  @ViewChild('infoIpt') infoIpt!: ElementRef;
  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private vrEncPRSvc: VrEncPRService,
    private activatedRoute: ActivatedRoute
  ) {}

  partsOfModel: any;
  processes: any;
  infoScan = {
    qaCard: null,
    model: null,
    line: null,
    date: null,
    shift: null,
    user: null,
  };
  process: any;
  materials: any;
  materialSelected: any = {};

  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();
  lotNoEdit: string | null = null;

  isLoadingSaveBtn: boolean = false;

  isOpenEditQtyModal: boolean = false;

  isOpenScanLabelModal: boolean = false;

  lotErrMsg: string | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.infoIpt.nativeElement.focus();
      let qaCard = this.activatedRoute.snapshot.queryParams['qaCard'];

      let obj = {
        target: {
          value: qaCard,
        },
      };

      this.scanInfo(obj);
    }, 0);
  }

  getProcesses(productTypeName: any) {
    this.vrEncPRSvc.getProcesses(productTypeName).subscribe((response) => {
      this.processes = response;
    });
  }

  getProcessesVer2(line: any) {
    this.vrEncPRSvc.getProcessesVer2(line).subscribe((response) => {
      this.processes = response;
    });
  }

  getMaterials(searchVo: any) {
    this.vrEncPRSvc.getMaterials(searchVo).subscribe((response) => {
      this.materials = response;
    });
  }

  scanInfo(event: any) {
    let data = event.target.value;

    let info = data.split('*');

    // Scan QA card
    if (info.length === 5) {
      if (data.includes(';')) {
        this.toastr.warning('Cần scan QA card và ID');
        this.infoIpt.nativeElement.select();
        return;
      }

      this.infoScan.qaCard = data;
      this.infoScan.model = info[0];
      this.infoScan.line = info[1];
      this.infoScan.date = info[2];
      this.infoScan.shift = info[3];

      this.getProcessesVer2(info[1]);
      this.getPartsByModel(this.infoScan.model);

      let searchVo = {
        qaCard: this.infoScan.qaCard,
        recordType: 'VEP',
      };

      this.getMaterials(searchVo);
    }

    // Scan User
    if (data.length === 7) {
      this.infoScan.user = data;
    }

    const isEmpty = Object.values(this.infoScan).some(
      (x) => x == null || x == ''
    );
    if (!isEmpty) {
      this.isOpenScanLabelModal = true;
    } else {
      this.toastr.warning('Cần scan mã nhân viên', 'Warning');
    }

    this.infoIpt.nativeElement.select();
  }

  scanLabel(event: any) {
    this.labelIpt.nativeElement.select();
    if (!this.process) {
      this.lotErrMsg = 'Bạn cần chọn công đoạn trước khi scan tem NVL';
      return;
    }

    let obj = Object.assign(
      this.infoScan,
      { processId: this.process },
      { label: event.target.value.trim() },
      { type: 'VEP' }
    );

    // Check nhầm NVL
    let data = obj.label.split(';');
    let lotNo = data[0] == 'B' ? data[4] : data[3];
    let part = data[0] == 'B' ? data[1] : data[0];

    if (!this.partsOfModel.includes(part)) {
      this.lotErrMsg = `Lot ${lotNo} không dùng cho model ${obj.model}`;
      this.toastr.error('Có lỗi !', 'Error', {
        timeOut: 15000,
      });
      return;
    }

    /**
     * Server Check
     * Push lot lên server để kiểm tra
     * Nếu OK thì add vào mapLotsScanned
     * Nếu có lỗi thì hiển thị thông báoaaa301298
     */
    this.vrEncPRSvc.scanLabel(obj).subscribe(
      (response) => {
        if (response.status == 'ERROR') {
          this.lotErrMsg = response.message;
          this.toastr.error('Có lỗi !', 'Error', {
            timeOut: 15000,
          });

          return;
        } else if (response.status == 'OK') {
          this.lotErrMsg = null;
          this.mapLotsScanned.set(obj.label, response.data);
          this.listLotsScanned = Array.from(
            this.mapLotsScanned.values()
          ).reverse();
          return;
        }
      },
      (error) => {
        
      }
    );

    this.labelIpt.nativeElement.select();
  }

  onChangeProcess(event: any) {
    console.log(event);
    this.labelIpt.nativeElement.select();
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 400);
    this.lotNoEdit = data.clotno;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
    this.importQtyIpt.nativeElement.select();
  }

  deleteLabelScanned(data: any) {
    console.log(data);

    this.mapLotsScanned.delete(data.label);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  insertMaterials() {
    this.isLoadingSaveBtn = true;
    console.log(this.listLotsScanned);

    if (!this.listLotsScanned.length) {
      this.isLoadingSaveBtn = false;
      return;
    }

    this.vrEncPRSvc
      .insertMaterials(this.listLotsScanned)
      .subscribe((response) => {
        this.toastr.success('OK', 'Success');
        this.isOpenScanLabelModal = false;

        let searchVo = {
          qaCard: this.infoScan.qaCard,
        };
        this.getMaterials(searchVo);

        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();
        this.isLoadingSaveBtn = false;

        this.infoScan.user = null;
        this.process = null;
        this.lotErrMsg = null;
      });
  }

  closeScanLabelModal() {
    this.lotErrMsg = null;
    this.isOpenScanLabelModal = false;
  }

  getPartsByModel(model: any) {
    this.vrEncPRSvc.getPartsByModel(model).subscribe((response) => {
      let parts = new Array();
      for (const item of response) {
        parts.push(item.pncomp);
      }
      this.partsOfModel = parts;

      console.log('Parts: ', this.partsOfModel);
    });
  }

  openEditQtyModal(data: any) {
    this.materialSelected.id = data.id;
    this.materialSelected.cpn = data.cpn;
    this.materialSelected.clotno = data.clotno;
    this.materialSelected.qty = data.qty;
    this.materialSelected.remark = data.remark;
    this.isOpenEditQtyModal = true;
  }

  updateQty() {
    this.vrEncPRSvc
      .updateMaterial(this.materialSelected)
      .subscribe((response) => {
        this.toastr.success('Update thành công', 'Success');
        this.isOpenEditQtyModal = false;
        let searchVo = {
          qaCard: this.infoScan.qaCard,
          recordType: 'VEP',
        };

        this.getMaterials(searchVo);
      });
  }
}
