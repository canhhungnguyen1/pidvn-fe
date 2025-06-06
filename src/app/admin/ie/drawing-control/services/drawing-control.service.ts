import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectActivityDto } from '../models/ProjectActivityDto';
import { ProcessRecordDto } from '../models/ProcessRecordDto';
import { ProjectDto } from '../models/ProjectDto';

@Injectable({
  providedIn: 'root',
})
export class DrawingControlService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/Users`);
  }

  public getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingControl/Products`);
  }

  public getProjects(): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Projects`,
      {}
    );
  }

  public getProject(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Project/${projectId}`
    );
  }

  public updateProject(project: ProjectDto): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/IE/DrawingControl/Project`, project
    );
  }

  public deleteProject(projectId: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/IE/DrawingControl/Project/${projectId}`
    );
  }

  public getProjectTypes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectTypes`
    );
  }

  public createProject(projectDto: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/Project`,
      projectDto
    );
  }

  public getProcesses(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/Processes?projectId=${projectId}`
    );
  }

  public getProcessRecordByProject(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProcessRecord?projectId=${projectId}`
    );
  }

  public updateProcessRecord(processRecord: ProcessRecordDto): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/ProcessRecord`, processRecord
    );
  }


  uploadDrawingStructure(file: File, projectId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/UploadDrawingStructure?projectId=${projectId}`,
      formData
    );
  }

  public getDrawingStructure(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/DrawingStructure?projectId=${projectId}`
    );
  }


  uploadDrawingFile(files: File[], projectId: number): Observable<any> {
    const formData = new FormData();

    // Append each file individually
    files.forEach(file => {
      formData.append('files', file);
    });

    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/DrawingFiles?projectId=${projectId}`,
      formData
    );
  }



  /**
   * Xem file Drawing
   * @param file
   * @returns
   */
  public previewDrawingFile(params: any, controlNo: string) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/IE/DrawingControl/DrawingPreview?controlNo=${controlNo}`,
      params,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }


  insertProjectActivity(file: File, projectActivity: ProjectActivityDto): Observable<any> {
    const formData = new FormData();
    
    // Đính kèm file vào formData
    formData.append('file', file);  // Đảm bảo tên 'file' khớp với @RequestPart trong Spring Boot
  
    // Đính kèm đối tượng projectActivity dưới dạng JSON
    formData.append('projectActivity', new Blob([JSON.stringify(projectActivity)], { type: 'application/json' }));
  
    return this.httpClient.post(
      `${this.baseUrl}/IE/DrawingControl/ProjectActivity`,
      formData
    );
  }

  getProjectActivity(projectId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/IE/DrawingControl/ProjectActivities?projectId=${projectId}`
    );
  }
  
  


}
