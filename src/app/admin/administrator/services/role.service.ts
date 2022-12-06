import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  public getRoles(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Administrator/Roles`
    );
  }

  public createRole(role: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Administrator/Roles`, role)
  }

  public updateRole(role: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/Administrator/Roles`, role)
  }
}
