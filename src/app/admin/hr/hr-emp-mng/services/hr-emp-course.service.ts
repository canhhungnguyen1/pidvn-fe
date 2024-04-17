import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HrEmpCourseService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getCourseHistories(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/Course/CourseHistory`, searchVo);
  }

  public getCourseGroups(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/Course/Course-Groups`);
  }
}
