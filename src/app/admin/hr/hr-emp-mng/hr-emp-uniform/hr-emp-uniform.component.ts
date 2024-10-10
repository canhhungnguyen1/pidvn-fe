import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HrEmpUniformService } from '../services/hr-emp-uniform.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-hr-emp-uniform',
  templateUrl: './hr-emp-uniform.component.html',
  styleUrls: ['./hr-emp-uniform.component.scss'],
})
export class HrEmpUniformComponent implements OnInit {

  @ViewChild('uniformGrid')
  uniformGrid!: DxDataGridComponent;

  constructor(
    private hrEmpUniformSvc: HrEmpUniformService,
    private toastr: ToastrService,
    private modal: NzModalService
  ) {}

  baseUrl = environment.baseUrl;

  users: any;
  uniforms: any;
  uniformTypes: any;
  uniformAdd = {
    id: null,
    username: null,
    uniformType: null,
    size: null,
    qty: null,
    date: new Date(),
    remark: null
  };

  masterData = {
    sizes: [
      'S',
      'M',
      'L',
      'XL',
      '2XL',
      '3XL',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
    ],
    quantities: [1, 2, 3, 4, 5, 6],
  };

  isOpenFileUploadModal: boolean = false;
  isOpenAddUniformModal: boolean = false;

  confirmModal?: NzModalRef;

  fileUploadApi: any;

  ngOnInit(): void {
    this.getUsers();
    this.getUniformTypes();
    this.getUserUniforms();
  }

  getUsers() {
    this.hrEmpUniformSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  openFileUploadModal() {
    this.isOpenFileUploadModal = true;
    this.fileUploadApi = `${this.baseUrl}/HR/UserUniform/UploadExcel`;
  }

  uploadFile() {
    this.isOpenFileUploadModal = false;
    this.getUserUniforms();
  }

  openAddUniformModal() {
    this.isOpenAddUniformModal = true;
  }

  getUserUniforms() {
    this.hrEmpUniformSvc.getUserUniforms().subscribe((response) => {
      this.uniforms = response;
    });
  }

  getUniformTypes() {
    this.hrEmpUniformSvc.getUniformTypes().subscribe((response) => {
      this.uniformTypes = response;
    });
  }

  addUniform() {
    this.hrEmpUniformSvc
      .saveUserUniform(this.uniformAdd)
      .subscribe((response) => {
        this.toastr.success('Thành công', 'Success');
        this.isOpenAddUniformModal = false;
        this.getUserUniforms();
      });
  }

  downloadExcelTemplate() {
    let searchVo = {};

    this.hrEmpUniformSvc
      .downloadExcelTemplate(searchVo)
      .subscribe((response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        let date = new Date().toLocaleDateString();
        link.download = `Uniform-${date}.xlsx`;
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  onChangeUpload(event: any) {
    console.log('onChangeUpload: ', event);
    
  }

  deleteSelection() {
    
  }

  removeSelection() {
    console.log(this.uniformGrid.instance.getSelectedRowsData());
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xóa không ?',
      nzContent: 'Sau khi click OK, hệ thống sẽ xóa những records đã được tích chọn ',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.hrEmpUniformSvc.deleteUserUniforms(this.uniformGrid.instance.getSelectedRowsData()).subscribe(
            response => {
              this.getUserUniforms();
              setTimeout(resolve, 0);
            }  
          )
        }).catch(() => console.log('Oops errors!'))
    });
  }

  onExportClient(event: any) {
    const workbook = new Workbook();    
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: event.component,
            worksheet: worksheet
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer: BlobPart) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Uniform-History.xlsx');
                });
        });
  }
}
