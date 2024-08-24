import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingControlService } from '../services/drawing-control.service';
import { ProjectDto } from '../models/ProjectDto';
import { ProjectTypeDto } from '../models/ProjectTypeDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SearchDto } from '../models/SearchDto';
import { error } from 'console';
import { UserDto } from '../models/UserDto';

@Component({
  selector: 'app-ie-dc-project',
  templateUrl: './ie-dc-project.component.html',
  styleUrls: ['./ie-dc-project.component.scss'],
})
export class IeDcProjectComponent implements OnInit {

  constructor(
    private router: Router,
    private drawingControlSvc: DrawingControlService,
    private jwtSvc: JwtHelperService
  ) {
    this.jwt = this.jwtSvc.decodeToken(localStorage.getItem('accessToken')?.toString())
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProjects();
    this.getProjectType();
  }


  jwt: any;
  users!: UserDto[];
  projects!: ProjectDto[]
  project!: ProjectDto
  projectTypes!: ProjectTypeDto[]

  isOpenProjectCreateModal: boolean = false

  isLoadingBtn: boolean = false;

  

  getUsers() {
    this.drawingControlSvc.getUsers().subscribe(
      response => {
        this.users = response.result
      }
    )
  }
  
  getProjects() {
    this.drawingControlSvc.getProjects().subscribe(
      response => {
        this.projects = response.result
      }
    )
  }

  getProjectType() {
    this.drawingControlSvc.getProjectTypes().subscribe(
      response => {
        this.projectTypes = response.result
      }
    )
  }

  createProject() {
    this.drawingControlSvc.createProject(this.project).subscribe(
      response => {
        this.getProjects();
        this.isOpenProjectCreateModal = false
      }
    )
  }

  openProjectInsertModal() {
    this.project = new ProjectDto();
    this.isOpenProjectCreateModal = true
  }


  onRowClick(event: any) {
    console.log('onRowClick:', event);
    
    let projectId = event.data.id;
    this.router.navigate(['/admin/ie/drawing-control/projects', projectId]);
  }

}
