import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckDateIqcService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getCheckLotNoIqc(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/WH/Check_date_iqc/Check`,searchVo);
  }

  
}