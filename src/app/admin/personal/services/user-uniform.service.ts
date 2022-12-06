import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUniformService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUserUniformSizes(username: string): Observable<any> {
    let params = new HttpParams().set('username', username);

    return this.httpClient.get(
      `${this.baseUrl}/Personal/UserUniform/UserUniformSizes`,
      { params }
    );
  }

  public getUserUniforms(username: string): Observable<any> {
    let params = new HttpParams().set('username', username);

    return this.httpClient.get(
      `${this.baseUrl}/Personal/UserUniform/UserUniforms`,
      { params }
    );
  }

  public saveUserUniformSize(userSizes: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Personal/UserUniform/UserUniformSize`,
      userSizes
    );
  }
}
