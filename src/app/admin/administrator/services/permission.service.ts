import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getPermissions(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Administrator/Permissions`);
  }

  public createPermission(permission: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Administrator/Permissions`,
      permission
    );
  }
}
