import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DrawingControlService } from '../services/drawing-control.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../models/ProjectDto';
import { ToastrService } from 'ngx-toastr';
import { DrawingDto } from '../models/DrawingDto';
import { ProjectActivityDto } from '../models/ProjectActivityDto';
import { ProcessDto } from '../models/ProcessDto';
import { DxFileUploaderComponent } from 'devextreme-angular';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {

  @ViewChild('fileUploader', { static: false }) fileUploader!: DxFileUploaderComponent;

  constructor(
    private drawingControlSvc: DrawingControlService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProject();
    this.getProcesses();
    // this.getProjectActivities();
  }


  
  project: ProjectDto = new ProjectDto();
  process: ProcessDto = new ProcessDto();
  processes!: ProcessDto [];
  drawings!: DrawingDto [];

  isOpenProcessModal: boolean = false

  getProject() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProject(projectId).subscribe(
      response => {
        this.project = response.result
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
  

  /**
   * Xử lý khi click vào Process
   */
  onClickProcess(event: any) {
    console.log('onClickProcess: ', event);

    this.process = event.data
    this.isOpenProcessModal = true

    if (this.process.id === 3) {
      this.getDrawingStructure();
      return;
    }
  }

  getDrawingStructure() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getDrawingStructure(projectId).subscribe(
      response => {
        this.drawings = response.result
      }
    )
  }


  isOpenUploadFileModal: boolean = false;

  uploadFileModal: any = {
    title: null,
    multiple: null,
    accept: null,
    uploadMode: null,
    type: null
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
      let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.drawingControlSvc.uploadDrawingStructure(selectedFiles[0], projectId).subscribe(
        response => {
          console.log(response);
          
        }
      )
    }
    
  }

}
