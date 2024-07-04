import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingControlService } from '../services/drawing-control.service';

@Component({
  selector: 'app-ie-dc-project',
  templateUrl: './ie-dc-project.component.html',
  styleUrls: ['./ie-dc-project.component.scss']
})
export class IeDcProjectComponent implements OnInit {
  
  constructor(private router: Router, private drawingControlSvc: DrawingControlService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  projects = [];


  isOpenProjectModal: boolean = false

  onRowClick(event: any) {
    let projectId = event.data.id;
    this.router.navigate(['/admin/ie/drawing-control/projects', projectId]);
  }

  getProjects() {
    this.drawingControlSvc.getProjects({}).subscribe(
      response => {
        this.projects = response
      }
    )
  }

  openProjectModal(obj: any) {
    this.isOpenProjectModal = true
  }
}
