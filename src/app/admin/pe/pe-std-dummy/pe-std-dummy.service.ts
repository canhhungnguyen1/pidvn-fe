import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeStdDummyService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.baseUrl;


  public getStdDummies(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/PE/StdDummy/StdDummies`);
  }

  public getLines(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/PE/StdDummy/Lines`);
  }

  public createStdDummy(stdDummy: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/PE/StdDummy/StdDummy`, stdDummy)
  }

  public deleteStdDummy(dummyId: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/PE/StdDummy/StdDummy/${dummyId}`)
  }
}
