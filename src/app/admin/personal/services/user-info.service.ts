import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUserInfo(username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Personal/UserInfo?username=${username}`
    );
  }

  public updateUserBasicInfo(userBasicInfo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Personal/BasicInfo`,
      userBasicInfo
    );
  }

  public updateUserOtherInfo(userOtherInfo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Personal/OtherInfo`,
      userOtherInfo
    );
  }

  public getUserFileTypes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Personal/UserFileTypes`);
  }

  public getUserFiles(username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Personal/UserFiles?username=${username}`
    );
  }

  public openUserFile(userFile: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Personal/OpenUserFile`,
      userFile,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }
}
