import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class QaTrainingMatrixService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getCourses(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Qa/TrainingMatrix/Courses`);
  }

  public getTrainingRecords(searchParam: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Qa/TrainingMatrix/Records`, searchParam);
  }

  public downloadTemplateUpload(): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Qa/TrainingMatrix/TemplateUpload`,{},{ responseType: 'blob' }
    );
  }
}
