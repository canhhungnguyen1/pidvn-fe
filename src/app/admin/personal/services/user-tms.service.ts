import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTmsService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getAttendanceDetails(username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Personal/UserTms/AttendanceDetail/${username}`
    );
  }

  
}
