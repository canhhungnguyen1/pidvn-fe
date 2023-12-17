import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdatePsiPriceService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getDailyReportData(date: Date): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/DailyReport/DailyReportData`,
      date
    );
  }
  public saveDailyReportData(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/PIH/DailyReport/SaveDailyReportData`,
      data
    );
  }
}
