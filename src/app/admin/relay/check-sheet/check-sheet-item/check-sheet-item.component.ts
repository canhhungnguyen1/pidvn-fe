import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CheckSheetService } from '../services/check-sheet.service';

@Component({
  selector: 'app-check-sheet-item',
  templateUrl: './check-sheet-item.component.html',
  styleUrls: ['./check-sheet-item.component.scss'],
})
export class CheckSheetItemComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private checkSheetSvc: CheckSheetService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  master: any;
  process: any;
  processName: any;

  items: any;

  isOpenAddNewModal: boolean = false;
  isOpenEditDetailModal: boolean = false;
  isOpenEditItemModal: boolean = false;

  itemAdd: any = {
    name: null,
    type: '2',
    unit: '2',
    process: null,
    minValue: null,
    maxValue: null,
  };

  detailSelected: any;

  ngOnInit(): void {
    this.master = this.activatedRoute.snapshot.queryParams['master'];
    this.process = this.activatedRoute.snapshot.queryParams['process'];
    this.processName = this.activatedRoute.snapshot.queryParams['processName'];

    this.getItems();
  }

  getItems() {
    this.checkSheetSvc
      .getItems(this.master, this.process)
      .subscribe((response) => {
        this.items = response;
        console.log('Items : ', this.items);
      });
  }

  cancelAddItem() {
    this.isOpenAddNewModal = false;
  }

  addItem() {
    this.itemAdd.process = parseInt(this.process);

    if (!this.itemAdd.name) {
      this.toastr.warning('Tên hạng mục không được để trống !');
      return;
    }

    if (this.itemAdd.unit == 1) {
      if (!this.itemAdd.minValue || !this.itemAdd.maxValue) {
        this.toastr.warning('Giá trị min, max không được để trống !');
        return;
      }

      if (this.itemAdd.minValue > this.itemAdd.maxValue) {
        this.toastr.warning('Giá trị min phải <= Giá trị max !');
        return;
      }
    }

    if (this.itemAdd.unit == 2) {
      this.itemAdd.minValue = null;
      this.itemAdd.maxValue = null;
    }

    console.log('Item Add : ', this.itemAdd);

    this.checkSheetSvc.addItem(this.itemAdd).subscribe((response) => {
      this.isOpenAddNewModal = false;
      this.getItems();
      this.itemAdd = {
        name: null,
        type: '2',
        unit: '2',
        process: null,
        minValue: null,
        maxValue: null,
      };
    });
  }

  showAddNewModal() {
    this.isOpenAddNewModal = true;
  }

  // Sửa check sheet detail
  openDetailModal(detail: any) {
    this.detailSelected = { ...detail };
    console.log('Detail: ', detail);
    this.isOpenEditDetailModal = true;
  }

  onCancelEditDetail() {
    this.isOpenEditDetailModal = false;
  }

  onEditDetail() {
    let detail = this.detailSelected;
    let employee = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    detail.employee = employee;
    detail.evaluate = this.getEvaluate(this.detailSelected);
    detail.master = this.master;

    this.checkSheetSvc.editDetail(detail).subscribe(
      response => {
        this.toastr.success('Success !', 'OK')
        this.getItems();
        this.isOpenEditDetailModal = false;
      }
    )
  }

  getEvaluate(detail: any) {
    if (detail.unit == 1) {
      if(detail.actualValue < detail.minValue) {
        return 'NG';
      }
      if(detail.actualValue > detail.maxValue) {
        return 'NG';
      }
      return 'OK'
    }

    if (detail.unit == 2) {

      if(detail.actualValue == 'NG') {
        return 'NG'
      }
      return 'OK'
    }
    return
  }
}
