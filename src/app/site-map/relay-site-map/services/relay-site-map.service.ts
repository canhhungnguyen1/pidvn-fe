import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelaySiteMapService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  public findProjectByType(projectType: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SiteMapRelay?projectType=${projectType}`);
  }
}
