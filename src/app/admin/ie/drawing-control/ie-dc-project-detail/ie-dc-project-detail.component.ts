import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ie-dc-project-detail',
  templateUrl: './ie-dc-project-detail.component.html',
  styleUrls: ['./ie-dc-project-detail.component.scss'],
})
export class IeDcProjectDetailComponent implements OnInit {

  ngOnInit() {
    // Mở tất cả các hàng khi khởi tạo
    this.expandedRowKeys = this.items.map(item => item.id);
  }

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
      note: 'So sánh giá các bên'
    },
  ];




  files = [
    {
      id: 1,
      name: 'TD-17000-0000',
      parentId: null,
      rootPath: 'D:\\Project',
      path:'RE-T0001',
      fileName: null,
      type: 'folder'
    },
    {
      id: 2,
      name: 'TD-17005-0000',
      parentId: 1,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000',
      fileName: null,
      type: 'folder'
    },
    {
      id: 3,
      name: 'TD-17005-0100',
      parentId: 2,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: null,
      type: 'folder'
    },
    {
      id: 4,
      name: 'TD-17005-0101',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0101.pdf',
      type: 'file'
    },
    {
      id: 5,
      name: 'TD-17005-0102',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0102.pdf',
      type: 'file'
    },
    {
      id: 6,
      name: 'TD-17005-0103',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0103.pdf',
      type: 'file'
    },
    {
      id: 7,
      name: 'TD-17005-0104',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0104.pdf',
      type: 'file'
    },
    {
      id: 8,
      name: 'TD-17005-0105',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0105.pdf',
      type: 'file'
    },
    {
      id: 9,
      name: 'TD-17005-0106',
      parentId: 3,
      rootPath: 'D:\\Project',
      path:'RE-T0001\\TD-17000-0000\\TD-17005-0100',
      fileName: 'TD-17005-0106.pdf',
      type: 'file'
    }
  ]


  isOpenProgressModal: boolean = false
  progressSelected: any;


  expandedRowKeys: number[] = []

  onRowClick(event: any) {
    console.log('onRowClick: ', event.data);
    
    this.progressSelected = event.data
    this.isOpenProgressModal = true

    
  }

  onExpandedRowKeysChanged(e: any) {
    this.expandedRowKeys = e.value;
  }


  isOpenActivityModal: boolean = false;
  
}
