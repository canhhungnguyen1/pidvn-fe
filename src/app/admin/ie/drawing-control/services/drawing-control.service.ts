import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDto } from '../models/ProjectDto';
import { ProjectProgressDto } from '../models/ProjectProgressDto';

@Injectable({
  providedIn: 'root'
})
export class DrawingControlService {

  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getProjects(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingControl/Projects`, searchVo);
  }

  public insertProject(projectDto: ProjectDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingControl/Project`, projectDto);
  }

  public updateProject(projectDto: ProjectDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/IE/DrawingControl/Project`, projectDto);
  }

  public getProjectTypes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/ProjectTypes`);
  }


  public getProjectById(projectId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/Project/${projectId}`);
  }

  public getProjectProgresses(projectId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/ProjectProgresses?projectId=${projectId}`);
  }

  public updateProjectProgress(projectProgressDto: ProjectProgressDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/IE/DrawingControl/ProjectProgress`, projectProgressDto);
  }


  // public getProjectProgressDetail(projectId: number, progressId: number): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/ProjectProgressDetail?projectId=${projectId}&projectProgressId=${progressId}`);
  // }















  public getIeProjectById(id: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingManagement/Project/${id}`); 
  }

  // public getProjects(params: any): Observable<any> {
  //   return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/Projects`, params);
  // }

  /**
   * Lấy các process theo project
   * @param params 
   * @returns 
   */
  public getProgressByProject(param: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/ProgressByProject`,param);
  }

  public saveProject(params: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/Project`, params);
  }


  public saveDrawing(params: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/Drawing`, params);
  }

  public getIeDrawings(projectId: number, progressId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingManagement/Drawings?projectId=${projectId}&progressId=${progressId}`);
  }

  public getIeProjectTypes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingManagement/ProjectType`);
  }

  /**
   * Xem file Drawing
   * @param file 
   * @returns 
   */
  public previewDrawing(params: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/IE/DrawingManagement/DrawingPreview`,
      params,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

}
