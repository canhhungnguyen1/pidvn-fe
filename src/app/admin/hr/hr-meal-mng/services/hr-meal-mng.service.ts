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

  /**
   * Thực hiện call api để lưu trữ dữ liệu timesheet từ PVG database về FDCS database
   * @returns 
   */
  public timesheetConfirm(table: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/HR/Meal/TimesheetConfirm?table=${table}`, null);
  }


  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    
    // Đính kèm file vào formData
    formData.append('file', file);  // Đảm bảo tên 'file' khớp với @RequestPart trong Spring Boot
  
    return this.httpClient.post(
      `${this.baseUrl}/HR/Meal/GetUserSendEmail`,
      formData
    );
  }

  sendEmail(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/Meal/SendEmail`,
      data
    );
  }

  

}