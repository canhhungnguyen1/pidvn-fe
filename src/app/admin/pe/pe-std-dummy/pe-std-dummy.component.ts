import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PeStdDummyService } from './pe-std-dummy.service';

@Component({
  selector: 'app-pe-std-dummy',
  templateUrl: './pe-std-dummy.component.html',
  styleUrls: ['./pe-std-dummy.component.scss'],
})
export class PeStdDummyComponent implements OnInit {
  constructor(
    private peStdDummySvc: PeStdDummyService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  stdDummies: any;

  isOpenModal: boolean = false;

  modalTitle: any;

  lines: any;

  isEditMode: boolean = false;
  dummySelected : any;

  ngOnInit(): void {
    this.getStdDummies();
    this.getLines();
  }

  getLines() {
    this.peStdDummySvc.getLines().subscribe((response) => {
      this.lines = response;
      console.log(this.lines);
    });
  }

  getStdDummies() {
    this.peStdDummySvc.getStdDummies().subscribe((response) => {
      this.stdDummies = response.reverse();
    });
  }

  

  openModal(item: any) {

    this.dummySelected = {
      id: item ? item.data.id : null,
      line: item ? item.data.line : null,
      code: item ? item.data.code : null,
      name: item ? item.data.name : null
    };

    this.isEditMode = item ? true : false;

    this.modalTitle = this.isEditMode ? 'Form chỉnh sửa' : 'Form tạo mới';

    this.isOpenModal = true;
  }

  deleteDummy(item: any) {
    this.peStdDummySvc.deleteStdDummy(item.data.id).subscribe((response) => {
      this.toastr.success('Xóa thành công', 'Success');
      this.isOpenModal = false
      this.getStdDummies();
    });
  }

  cancelSave() {
    this.isOpenModal = false;
  }

  onSave() {
    if (this.isEditMode) {
      console.log('Chế độ Edit: ', this.dummySelected);
      this.dummySelected = null;
      return;
    }

    this.createDummy();
    return;
  }

  createDummy() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let obj = {
      line: this.dummySelected.line,
      code: this.dummySelected.code,
      username: username,
      name: this.dummySelected.name,
      flag: 1
    };

    this.peStdDummySvc.createStdDummy(obj).subscribe(
      response => {
        this.toastr.success('Thêm thành công', 'Success');
        this.getStdDummies();
        this.isOpenModal = false;
        
      }
    );
  }
}
