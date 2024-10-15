import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DrawingControlService } from '../services/drawing-control.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../models/ProjectDto';
import { ToastrService } from 'ngx-toastr';
import { DrawingDto } from '../models/DrawingDto';
import { ProjectActivityDto } from '../models/ProjectActivityDto';
import { ProcessDto } from '../models/ProcessDto';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { ProcessRecordDto } from '../models/ProcessRecordDto';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {

  @ViewChild('fileUploader', { static: false }) fileUploader!: DxFileUploaderComponent;
  @ViewChild('projectActivityUploader', { static: false }) projectActivityUploader!: DxFileUploaderComponent;

  

  constructor(
    private drawingControlSvc: DrawingControlService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProject();
    // this.getProcesses();
    this.getProcessRecordByProject();
    this.getProjectActivities();
  }


  
  project: ProjectDto = new ProjectDto();
  process: ProcessDto = new ProcessDto();
  processes!: ProcessDto [];

  processRecords!: ProcessRecordDto [];
  processRecord: ProcessRecordDto = new ProcessRecordDto();

  drawings!: DrawingDto [];
  projectActivity: ProjectActivityDto = new ProjectActivityDto();

  isOpenProcessModal: boolean = false;
  isOpenUploadFileModal: boolean = false;
  uploadFileModal: any = {
    title: null,
    multiple: null,
    accept: null,
    uploadMode: null,
    type: null
  }

  isOpenProjectActivityModal: boolean = false;
  projectActivities!: ProjectActivityDto [];
  isLoading: boolean = false

  getProject() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProject(projectId).subscribe(
      response => {
        this.project = response.result
      }
    )
  }

  updateProject() {
    this.drawingControlSvc.updateProject(this.project).subscribe(
      response => {
        this.toastr.success('Success','Updated')
      }
    )
  }

  getProcesses() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProcesses(projectId).subscribe(
      response => {
        this.processes = response.result
      }
    )
  }

  getProcessRecordByProject() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProcessRecordByProject(projectId).subscribe(
      response => {
        this.processRecords = response.result
      }
    )
  }
  

  /**
   * Xử lý khi click vào Process
   */
  onClickProcess(event: any) {
    console.log('onClickProcess: ', event);

    this.processRecord = event.data
    this.isOpenProcessModal = true

    if (this.processRecord.processId === 3) {
      this.getDrawingStructure();
      return;
    }
  }

  /**
   * Expand các parent child drawing file
   */
  expandedDrawingRowKeys: number[] = [];
  onExpandedRowKeysChanged(e: any) {
    this.expandedDrawingRowKeys = e.value;
  }

  getDrawingStructure() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getDrawingStructure(projectId).subscribe(
      response => {
        this.drawings = response.result

        // Mở tất cả các hàng khi khởi tạo
        this.expandedDrawingRowKeys = this.drawings.map((item: any) => item.id);
      }
    )
  }


  
  /**
   * Mở modal upload
   * @param type 
   * @returns 
   */
  openUploadFileModal(type: string) {
    if (type === 'DRAWING_STRUCTURE') {
      this.openUploadDrawingStructure();
      return
    }else if(type === 'DRAWING_FILE') {
      this.openUploadDrawingFile();
    }
  }

  openUploadDrawingStructure() {
    this.uploadFileModal.title = 'Upload Drawing Structure';
    this.uploadFileModal.multiple = false;
    this.uploadFileModal.accept = '.xlsx';
    this.uploadFileModal.uploadMode = 'useForm';
    this.uploadFileModal.type = 'DRAWING_STRUCTURE'
    this.isOpenUploadFileModal = true;
  }

  openUploadDrawingFile() {
    this.uploadFileModal.title = 'Upload Drawing File';
    this.uploadFileModal.multiple = true;
    this.uploadFileModal.accept = '.pdf';
    this.uploadFileModal.uploadMode = 'useForm';
    this.uploadFileModal.type = 'DRAWING_FILE';
    this.isOpenUploadFileModal = true
  }

  /**
   * thực hiện upload file lên server
   */
  uploadFile() {
    const selectedFiles = this.fileUploader.value;

    console.log('selectedFiles: ', selectedFiles);

    if (selectedFiles.length === 0) {
      this.toastr.warning('Cần chọn file upload','Warning')
      return;
    }

    if (this.uploadFileModal.type === 'DRAWING_STRUCTURE') {
      this.isLoading = true
      let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.drawingControlSvc.uploadDrawingStructure(selectedFiles[0], projectId).subscribe(
        response => {
          this.getDrawingStructure();
          this.isOpenUploadFileModal = false
          this.isLoading = false
        },
        error => {
          this.isOpenUploadFileModal = false
          this.isLoading = false
        }
      )
    }

    if (this.uploadFileModal.type === 'DRAWING_FILE') {
      this.isLoading = true
      let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.drawingControlSvc.uploadDrawingFile(selectedFiles, projectId).subscribe(
        response => {
          this.getDrawingStructure();
          this.isOpenUploadFileModal = false
          this.isLoading = false
        },
        error => {
          this.isOpenUploadFileModal = false
          this.isLoading = false
        }
      )
    }
  }


  previewDrawingFile(event: any, isPreview: boolean) {
    
      let drawingNo = event.data.drawingNo;
      let params = {
         drawingNo: drawingNo
      };

      this.drawingControlSvc.previewDrawingFile(params, this.project.controlNo).subscribe((response) => {
        let file = new Blob([response], { type: 'application/pdf' });
        let fileURL = URL.createObjectURL(file);
        let fileName = `${drawingNo}.pdf`;

        

        // Open the file in a new window

        if (isPreview) {
          window.open(fileURL);
          return
        }

        // Create a link element to download the file with the file name
        let a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Remove the link element after the download
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL);
        }, 100);

      });
    

  }

  openProjectActivityModal() {
    this.projectActivity = new ProjectActivityDto();
    this.isOpenProjectActivityModal = true
  }


  insertProjectActivity() {
    
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    const selectedFile = this.projectActivityUploader.value[0];
    if (selectedFile) {
      this.projectActivity.attachFile = selectedFile.name
    }
    this.projectActivity.projectId = projectId;
    
    if (!this.projectActivity.date) {
      this.toastr.warning('Date không được để trống','Warning')
      return
    }

    this.drawingControlSvc.insertProjectActivity(selectedFile, this.projectActivity).subscribe(
      response => {
        this.getProjectActivities();
        this.isOpenProjectActivityModal = false
      }
    )
  }

  getProjectActivities() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProjectActivity(projectId).subscribe(
      response => {
        this.projectActivities = response.result
      }
    )
  }


  updateProcessRecord() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.processRecord.projectId = projectId;

    this.drawingControlSvc.updateProcessRecord(this.processRecord).subscribe(
      response => {
        this.toastr.success('Success','Updated')
        this.processRecord.id = response.result.id
      }
    )
  }

  updateProcessRecordV2(event: any) {
    console.log(event);
    
  }
}
