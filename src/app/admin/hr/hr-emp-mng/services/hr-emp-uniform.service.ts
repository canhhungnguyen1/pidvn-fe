import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HrEmpUniformService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/UserUniform/Users`);
  }

  public getUserUniforms(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/UserUniform/UserUniforms`);
  }

  public getUniformTypes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/UserUniform/UserUniformTypes`
    );
  }

  public saveUserUniform(userUniform: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/UserUniform/UserUniform`,
      userUniform
    );
  }

  public downloadExcelTemplate(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/UserUniform/DownloadExcelTemplate`,
      searchVo,
      { responseType: 'blob' }
    );
  }

  public deleteUserUniforms(userUniforms: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/UserUniform/DeleteUserUniforms`,
      userUniforms
    );
  }
}
