import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PihStopLineInputService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUserArea(userCode: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/v2/UserArea/${userCode}`
    );
  }

  public getLines(productTypeId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/v2/Lines?productTypeId=${productTypeId}`
    );
  }

  public getModels(productTypeId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/v2/Models?productTypeId=${productTypeId}`
    );
  }

  public getShifts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/PIH/StopLine/v2/Shifts`);
  }

  public getStopItems(productTypeId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/PIH/StopLine/v2/StopItems?productTypeId=${productTypeId}`
    );
  }
}
