import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PihStopLineService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  public getProductTypes(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/ProductTypes?productId=${productId}`
    );
  }

  public getLines(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/Lines`
    );
  }

  public getShifts(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/Shifts`
    );
  }

  public getStopTypes(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/StopTypes`
    );
  }

  public getStopGroups(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/StopGroups`
    );
  }

  public getStopItems(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/StopItems`
    );
  }

  public createStopTime(stopTime: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/PIH/StopLine/StopTime`,stopTime);
  }

  public updateStopTime(stopTime: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/PIH/StopLine/StopTime`,stopTime);
  }

  public getStopTimes(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/PIH/StopLine/StopTimes`,searchVo);
  }

  public deleteStopTime(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/PIH/StopLine/StopTime/${id}`)
  }

}
