import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PihStopLineInputService } from '../services/pih-stop-line-input.service';

@Component({
  selector: 'app-psli-input',
  templateUrl: './psli-input.component.html',
  styleUrl: './psli-input.component.scss',
})
export class PsliInputComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihStopLineSvc: PihStopLineInputService
  ) {}

  jwt!: any;

  userArea: any;

  isOpenInputModal: boolean = false;
  isLoading: boolean = false;

  lines: any[] = [];
  models: any[] = [];
  shifts: any[] = [];
  stopItems: any[] = [];

  stopTimeCreate: any = {};

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getUserArea();
  }

  /**
   * Kiểm tra user đang ở khu vực nào
   */
  getUserArea() {
    this.pihStopLineSvc.getUserArea(this.jwt.Username).subscribe((response) => {
      // TODO

      this.userArea = response.result;

      this.getStopItems(this.userArea.productTypeId);
      this.getLines(this.userArea.productTypeId);
      this.getModels(this.userArea.productTypeId);
      this.getShifts();

      console.log('getUserArea: ', response);
    });
  }

  /**
   * Lấy danh sách các Line theo khu vực (productTypeId)
   *
   * @param productTypeId khu vực
   */
  getLines(productTypeId: number) {
    this.pihStopLineSvc.getLines(productTypeId).subscribe((response) => {
      this.lines = response.result;
      console.log('getLines: ', this.lines);
    });
  }

  getShifts() {
    this.pihStopLineSvc.getShifts().subscribe((response) => {
      this.shifts = response.result;
      console.log('getShifts: ', this.shifts);
    });
  }

  /**
   * Lấy danh sách các Model theo productTypeId
   *
   * @param productTypeId
   */
  getModels(productTypeId: number) {
    this.pihStopLineSvc.getModels(productTypeId).subscribe((response) => {
      this.models = response.result;
      console.log('getModels: ', this.models);
    });
  }

  getStopItems(productTypeId: number) {
    this.pihStopLineSvc.getStopItems(productTypeId).subscribe((response) => {
      this.stopItems = response.result;
      console.log('getStopItems: ', this.stopItems);
    });
  }


  itemSelected: any = {}

  /**
   * Khi chọn Item
   * @param event 
   */
  onChangeStopItem(event: any) {

    console.log('onChangeStopItem: ', event);
    
    this.itemSelected = this.stopItems.find(item => item.id === event);
  }

  





  // Style header
  onCellPrepared(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#000080'; // Change background color
      e.cellElement.style.color = '#ffffff'; // Change text color for better visibility
      e.cellElement.style.fontWeight = 'bold';
    }
  }
}
