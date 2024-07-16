import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrawingControlService {

  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;


  public getProjects(params: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/Projects`, params);
  }

  public saveDrawing(params: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/IE/DrawingManagement/Drawing`, params);
  }

  public getIeDrawings(projectId: number, progressId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/DrawingManagement/Drawings?projectId=${projectId}&progressId=${progressId}`);
  }

}
