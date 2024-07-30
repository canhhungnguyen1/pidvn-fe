import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingControlService } from '../services/drawing-control.service';
import { ProjectDto } from '../models/ProjectDto';
import { ProjectTypeDto } from '../models/ProjectTypeDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SearchDto } from '../models/SearchDto';

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
    this.getPersonInCharges();
    this.getProjects();
    this.getProjectType();
    this.getProducts();
  }


  jwt: any;
  users: any;
  products: any;
  project!: ProjectDto
  projects!: ProjectDto[]
  projectTypes!: ProjectTypeDto[]
  isOpenProjectInsertModal: boolean = false

  searchDto: SearchDto = new SearchDto;

  displayProduct(product:any) {
    return product ? `${product.factoryCode} - ${product.description}` : '';
  }

  displayPersonInChargeName(user:any) {
    return user ? `${user.username} - ${user.name}` : '';
  }

  public getPersonInCharges() {
    this.drawingControlSvc.getPersonInCharges().subscribe(
      response => {
        this.users = response
      }
    )
  }

  public getProducts() {
    this.drawingControlSvc.getProducts().subscribe(
      response => {
        this.products = response
      }
    )
  }

  getProjects() {
    this.drawingControlSvc.getProjects({}).subscribe(
      response => {
        this.projects = response
      }
    )
  }

  getProjectType() {
    this.drawingControlSvc.getProjectTypes().subscribe(
      response => {
        this.projectTypes = response
      }
    )
  }

  onInsertProject() {
    this.project.createdBy = this.jwt.Username
    this.drawingControlSvc.insertProject(this.project).subscribe(
      response => {
        this.getProjects();
        this.isOpenProjectInsertModal = false
      },
      error => {
        this.isOpenProjectInsertModal = false
      }
    )
  }

  openProjectInsertModal() {
    this.project = new ProjectDto();
    this.isOpenProjectInsertModal = true
  }


  onRowClick(event: any) {
    console.log('onRowClick:', event);
    
    let projectId = event.data.id;
    this.router.navigate(['/admin/ie/drawing-control/projects', projectId]);
  }
}
