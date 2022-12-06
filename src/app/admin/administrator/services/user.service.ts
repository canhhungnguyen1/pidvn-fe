import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Administrator/Users`,
      searchVo
    );
  }
}
