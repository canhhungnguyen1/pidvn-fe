import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getLogFiles(searchParam: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Pidvn/Logger/LogFiles`,
      searchParam
    );
  }

  viewLogFile(searchParam: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Pidvn/Logger/ViewLog`, searchParam, { responseType: 'text' });
  }
}
