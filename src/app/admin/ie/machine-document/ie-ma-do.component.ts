import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxFileUploaderComponent } from 'devextreme-angular';
import { IeMaDoService } from './services/ie-ma-do.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-ie-ma-do',
  templateUrl: './ie-ma-do.component.html',
  styleUrl: './ie-ma-do.component.scss',
})
export class IeMaDoComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false })
  machineFileGrid!: DxDataGridComponent;

  @ViewChild('fileUploader', { static: false })
  fileUploader!: DxFileUploaderComponent;

  

  constructor(
    private ieMaDoSvc: IeMaDoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getMachines();
    this.getMachineFiles();
  }

  isOpenUploadModal: boolean = false;
  machineCode: string | null = null;
  machines: any;
  machineFiles: any;
  isLoading: boolean = false

  getMachineFiles() {
    this.machineFileGrid?.instance.beginCustomLoading(
      `Đang tải dữ liệu ...`
    );

    this.ieMaDoSvc.getMachinesFiles().subscribe((response) => {
      this.machineFiles = response.result;
      this.machineFileGrid.instance.endCustomLoading();
    });
  }

  getMachines() {
    this.ieMaDoSvc.getMachines().subscribe((response) => {
      this.machines = response.result;
    });
  }

  uploadFile() {

    if (this.machineCode == null) {
      this.toastr.warning("Máy không được để trống","Warning")
      return
    }

    this.isLoading = true;
    const selectedFile = this.fileUploader;

    console.log('uploadFile: ', selectedFile.value[0]);

    let createdBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let obj = {
      machineCode: this.machineCode,
      createdBy: createdBy,
    };

    this.ieMaDoSvc.uploadFile(selectedFile.value, obj).subscribe((response) => {
      console.log('response: ', response);
      this.getMachineFiles();
      this.isLoading = false;
      
      this.clearFiles();
    });
  }

  clearFiles() {
    this.fileUploader.instance.reset();
    this.machineCode = null;
    // this.getMachines();
  }
}
