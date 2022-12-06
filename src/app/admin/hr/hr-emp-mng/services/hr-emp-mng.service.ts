import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrEmpMngService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  public getUsers(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/UserInfoManagement/Users`,
      searchVo
    );
  }

  // 
  public getUserInfo(username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/UserInfoManagement/UserInfo?username=${username}`
    );
  }

  public updateUserBasicInfo(userBasicInfo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/HR/UserInfoManagement/BasicInfo`,
      userBasicInfo
    );
  }

  public updateUserOtherInfo(userOtherInfo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/HR/UserInfoManagement/OtherInfo`,
      userOtherInfo
    );
  }

  public getUserFileTypes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/UserInfoManagement/UserFileTypes`);
  }

  public getUserFiles(username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/UserInfoManagement/UserFiles?username=${username}`
    );
  }

  public openUserFile(userFile: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/HR/UserInfoManagement/OpenUserFile`,
      userFile,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

  public deleteUserFile(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/HR/UserInfoManagement/DeleteUserFile?id=${id}`);
  }

}
