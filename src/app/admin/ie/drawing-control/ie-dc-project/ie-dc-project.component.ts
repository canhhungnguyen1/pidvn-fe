import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ie-dc-project',
  templateUrl: './ie-dc-project.component.html',
  styleUrls: ['./ie-dc-project.component.scss']
})
export class IeDcProjectComponent {
  
  constructor(private router: Router) { }

  projects = [
    {
      id: 1,
      controlNo: 'RE-T0001',
      projectName: 'PF Coil Supply',
      projectType: 'Machine',
      product: 'Relay',
      createdAt: '2024-06-23',
      status: 'Extract Drawing',
      mainPic: 'Nguyễn Cảnh Hưng',
      process: 85
    },
    {
      id: 2,
      controlNo: 'RE-T0002',
      projectName: 'PF Coil Supply',
      projectType: 'Press MC',
      product: 'Relay',
      createdAt: '2024-06-24',
      status: 'Extract Drawing',
      mainPic: 'Trần Duy Tùng',
      process: 60
    },
    {
      id: 3,
      controlNo: 'RE-T0002',
      projectName: 'PF Coil Supply',
      projectType: 'Press MC',
      product: 'Relay',
      createdAt: '2024-06-24',
      status: 'Extract Drawing',
      mainPic: 'Trần Duy Tùng',
      process: 100
    },
    {
      id: 4,
      controlNo: 'RE-T0002',
      projectName: 'PF Coil Supply',
      projectType: 'Press MC',
      product: 'Relay',
      createdAt: '2024-06-24',
      status: 'Extract Drawing',
      mainPic: 'Trần Duy Tùng',
      process: 0
    }
    
  ]

  onRowClick(event: any) {
    let projectId = event.data.id;
    this.router.navigate(['/admin/ie/drawing-control/projects', projectId]);
  }

}
