import { Component, OnInit } from '@angular/core';
import { DrawingControlService } from '../services/drawing-control.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../models/ProjectDto';
import { ToastrService } from 'ngx-toastr';
import { ProjectProgressDto } from '../models/ProjectProgressDto';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {
  constructor(
    private drawingControlSvc: DrawingControlService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getProjectById();
    this.getProjectProgresses();
  }

  project: ProjectDto = new ProjectDto()
  progresses!: ProjectProgressDto [];



  progress = [
    {
      id: 1,
      item: 'Disscusing',
      content: 'Thảo luận về giá',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '2024-03-27',
      progress: 100,
    },
    {
      id: 2,
      item: 'Design',
      content: 'Thiết kế và review',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 85,
    },
    {
      id: 3,
      item: 'Drawing',
      content: 'Xuất bản vẽ',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 85,
    },
    {
      id: 4,
      item: 'PO',
      content: 'Xin báo giá',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 90,
    },
    {
      id: 5,
      item: 'Processing',
      content: 'Gia công',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 0,
    },
    {
      id: 6,
      item: 'Setup',
      content: 'Setup',
      startPlan: '2024-03-25',
      endPlan: '2024-03-26',
      startAction: '2024-03-25',
      endAction: '',
      progress: 0,
    },
  ];

  activities = [
    {
      id: 1,
      createdAt: '2024-06-23',
      content: 'Design Review',
      note: 'Meeting with OTW about comment',
    },
    {
      id: 2,
      createdAt: '2024-06-24',
      content: 'Design Review',
      note: 'Chốt phương án họp với ...',
    },
    {
      id: 3,
      createdAt: '2024-06-25',
      content: 'Investment',
      note: 'So sánh giá các bên',
    },
  ];

  drawings = [];

  isOpenProgressModal: boolean = false;
  progressSelected: any;

  expandedRowKeys: number[] = [];


  getProjectById() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.drawingControlSvc.getProjectById(projectId).subscribe(
      response => {
        this.project = response
        console.log('project', this.project);
      }
    )
  }

  getProjectProgresses() {
    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.drawingControlSvc.getProjectProgresses(projectId).subscribe(
      response => {
        this.progresses = response
        console.log('progresses: ', this.progresses);
      }
    )
  }


  onUpdateProject() {
    console.log("ProjectUpdated: ", this.project);
    
    this.drawingControlSvc.updateProject(this.project).subscribe(
      response => {
        this.project = response
        this.toastr.success("Updated")
      }
    )


  }










  // getIeProjectById() {
  //   let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  //   this.drawingControlSvc.getIeProjectById(projectId).subscribe(
  //     response => {
  //       this.project = response;
  //       this.getProgressByProject();
  //     }
  //   )
  // }



  /**
   * Lấy danh sách các progress
   */
  getProgressByProject() {

    let param = {
      projectId: this.project?.id,
      projectTypeId: this.project?.projectTypeId
    }

    this.drawingControlSvc.getProgressByProject(param).subscribe(
      response => {
        this.progress = response
      }
    )
       
  }

  /**
   * Xử lý khi click vào progress
   * @param event 
   */
  onRowClickProgress(event: any) {
    console.log('onRowClick: ', event.data);
    
    this.progressSelected = event.data;


    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    let progressId = this.progressSelected.progressId

    this.drawingControlSvc.getIeDrawings(projectId, progressId).subscribe(
      response => {
        console.log('List Drawings: ', response);
        this.drawings = response

        // Mở tất cả các hàng khi khởi tạo
        this.expandedRowKeys = this.drawings.map((item:any) => item.id);
      }
    )

    this.isOpenProgressModal = true;
  }

  onExpandedRowKeysChanged(e: any) {
    this.expandedRowKeys = e.value;
  }

  isOpenActivityModal: boolean = false;

  onSavingDrawing(e: any) {
    // const info = e.changes[0];
    // console.log('onSavingDrawing: ', info);
    // let obj = {
    //   id: info.key,
    //   parentId: info.data.parentId
    // }
    // console.log('obj: ', obj);
  }

  onSavedDrawing(e: any) {
    


    let projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    let progressId = this.progressSelected.id
    const info = e.changes[0].data;
    let obj = {
      id: info.id,
      parentId: info.parentId == -1 ? null : info.parentId,
      drawingNo: info.drawingNo,
      drawingName: info.drawingName,
      qty: info.qty,
      unit: info.unit,
      material: info.material,
      polishing: info.polishing,
      hardness: info.hardness,
      projectId: projectId,
      progressId: progressId,
      createdAt: info.createdAt
    };

    console.log(obj);
    

    this.drawingControlSvc.saveDrawing(obj).subscribe((response) => {
      console.log('saveDrawing: ', response);
    });
  }




  viewFile(item:any) {
    console.log('viewFile: ', item.data);
    
  }

  onCellClick(event: any) {
    let dataField = event.column.dataField;

    

    console.log(event.data);
    

    if (dataField === "drawingName" ) {

      let rootURL = `D:\\Workspace\\ProjectManagement\\Project\\RE-T0001\\Drawing\\${event.data.drawingNo}.pdf`;
      let params = {url: rootURL}
      
      this.drawingControlSvc.previewDrawing(params).subscribe(
        response => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        }
      )
      

    }


  }
}
