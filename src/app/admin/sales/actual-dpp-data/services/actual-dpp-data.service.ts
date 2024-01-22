import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActualDppDataService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getAndWriteActualDpp(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Sales/ActualDppData/GetAndWriteExcelActualDpp`
    );
  }

  
  
}
