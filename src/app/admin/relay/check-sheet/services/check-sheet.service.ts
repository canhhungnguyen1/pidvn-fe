import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckSheetService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getCheckSheetMaster(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/CheckSheet/Master`,
      searchVo
    );
  }

  public getProcesses(master: string, line: string, model: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/CheckSheet/Processes?master=${master}&line=${line}&model=${model}`
    );
  }

  public getItems(master: any, process: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/CheckSheet/Items?master=${master}&process=${process}`
    );
  }

  public addItem(itemVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/CheckSheet/Item`,
      itemVo
    );
  }

  public exportData(master: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/CheckSheet/ExportData`,
      master,
      { responseType: 'blob' }
    );
  }

  public approveCheckSheet(master: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Relay/CheckSheet/ApproveCheckSheet`,
      master
    );
  }

  public editDetail(detail: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Relay/CheckSheet/Detail`,
      detail
    );
  }

  public showGuideline() {
    return this.httpClient.get<any>(
      `${this.baseUrl}/Relay/CheckSheet/GuideLines`,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

  public getModels(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/CheckSheet/Models`);
  }

  public updateProcess(processVo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Relay/CheckSheet/Process`,
      processVo
    );
  }
}
