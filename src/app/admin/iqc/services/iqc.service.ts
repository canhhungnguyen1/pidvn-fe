import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class IqcService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getIqcRequests(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/IQC/IqcRequests`,
      searchParams
    );
  }
}
