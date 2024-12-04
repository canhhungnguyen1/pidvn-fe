import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IcpDto } from '../models/IcpDto';

@Injectable({
  providedIn: 'root',
})
export class QaIcpDataService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getModels(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/ICP/Models`);
  }

  public getPsMasters(parentModel: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/ICP/PsMasters?parentModel=${parentModel}`
    );
  }

  public getIcpData(parentModel: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/ICP/IcpData?parentModel=${parentModel}`
    );
  }

  public insertIcpData(icpDto: IcpDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/QA/ICP/IcpData`, icpDto);
  }

  public updateIcpData(icpDto: IcpDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/QA/ICP/IcpData`, icpDto);
  }

  public deleteIcpData(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/QA/ICP/IcpData/${id}`);
  }

  /**
   * Xem file Test report
   * @param file
   * @returns
   */
  public previewFile(params: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/QA/ICP/Preview`, params, {
      responseType: 'arraybuffer' as 'json',
    });
  }

  /**
   * 
   * @returns 
   */
  public downloadFile(obj: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/ICP/Download`,
      obj,
      { responseType: 'blob' }
    );
  }


  uploadTestReports(files: File[]): Observable<any> {
    const formData = new FormData();

    // Append each file individually
    files.forEach(file => {
      formData.append('files', file);
    });

    return this.httpClient.post(
      `${this.baseUrl}/QA/ICP/TestReport`,
      formData
    );
  }
}
