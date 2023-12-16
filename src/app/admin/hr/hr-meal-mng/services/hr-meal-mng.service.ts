import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HrMealMngService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getMealRecords(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/Meal/MealRecords`, searchVo);
  }

  public getBalance(month: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/Meal/Balance`, month);
  }

  public timesheetConfirm(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/Meal/TimesheetConfirm`, null);
  }

}