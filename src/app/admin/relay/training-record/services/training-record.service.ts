import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingRecordService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getTrainingRecordMaster(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Masters`,
      searchVo
    );
  }

  public saveTrainingRecordMaster(master: any, action: number) {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Master?action=${action}`,
      master
    );
  }

  public createTrainingRecordMaster(master: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Master`,
      master
    );
  }

  public getTrainingRecordDetail(searchVo: any) {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Details`,
      searchVo
    );
  }

  public saveTrainingRecordDetail(detail: any, master: number, type: string, scoreOfPass: number) {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Detail?master=${master}&type=${type}&scoreOfPass=${scoreOfPass}`,
      detail
    );
  }

  public getTrainingRecordType(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/TrainingRecord/Types`);
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/TrainingRecord/Users`);
  }

  public approveTrainingRecord(
    master: number,
    username: string
  ): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Approval?master=${master}&username=${username}`,
      null
    );
  }

  public attendanceUser(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Attendance`,
      searchVo
    );
  }

  public getCourses(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/TrainingRecord/Courses`);
  }

  public getHistories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/TrainingRecord/Histories`);
  }

  public showGuideline() {
    return this.httpClient.get<any>(`${this.baseUrl}/Relay/TrainingRecord/GuideLines`, {
      responseType: 'arraybuffer' as 'json',
    });
  }

  public saveCourse(course: any, action: number) {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/TrainingRecord/Course?action=${action}`,
      course
    );
  }
}
