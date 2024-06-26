import { Component } from '@angular/core';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent {
  items = [
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
      note: 'So sánh giá các bên'
    },
  ];



  isOpenProgressModal: boolean = false
  progressSelected: any;

  onRowClick(event: any) {

    this.progressSelected = event.data
    this.isOpenProgressModal = true

    
  }
}
