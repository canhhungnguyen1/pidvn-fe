import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from '../models/ProductDto';
import { ProjectDto } from '../models/ProjectDto';
import { ProjectTypeDto } from '../models/ProjectTypeDto';
import { UserDto } from '../models/UserDto';
import { DrawingControlService } from '../services/drawing-control.service';

@Component({
  selector: 'app-ie-dc-project',
  templateUrl: './ie-dc-project.component.html',
  styleUrls: ['./ie-dc-project.component.scss'],
})
export class IeDcProjectComponent implements OnInit {

  constructor(
    private router: Router,
    private drawingControlSvc: DrawingControlService,
    private jwtSvc: JwtHelperService,
    private toastr: ToastrService
  ) {
    this.jwt = this.jwtSvc.decodeToken(localStorage.getItem('accessToken')?.toString())
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
    this.getProjects();
    this.getProjectType();
  }


  jwt: any;
  users!: UserDto[];
  products!: ProductDto [];
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

  getProducts() {
    this.drawingControlSvc.getProducts().subscribe(
      response => {
        this.products = response.result
      }
    )
  }
  
  displayPersonInChargeName(user:any) {
    return user ? `${user.username} - ${user.name}` : '';
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

    if (!this.project.controlNo || !this.project.name || !this.project.typeId || !this.project.picId || !this.project.productId) {
      this.toastr.warning('Cần nhập đủ thông tin','Warning')
      return
    }


    this.project.createdId = this.jwt.Username
    this.drawingControlSvc.createProject(this.project).subscribe(
      response => {
        this.getProjects();
        this.isOpenProjectCreateModal = false
      }
    )
  }

  deleteProject(projectId: number) {
    this.drawingControlSvc.deleteProject(projectId).subscribe(
      response => {
        console.log("deleteProject: ", response);
        this.getProjects();
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
