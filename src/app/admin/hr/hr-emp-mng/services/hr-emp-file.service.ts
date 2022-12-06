import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HrEmpFileService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/UserFile/Users`);
  }

  public getUserFiles(username: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/UserFile/Files/${username}`);
  }

  public deleteFile(file: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/UserFile/Files/`, file);
  }
}
