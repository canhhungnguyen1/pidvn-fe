import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaOqcDocumentService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getModels(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/OqcDocument/Models`);
  }

  public getDocuments(filter: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filter).forEach(
      (key) => filter[key] && (params = params.append(key, filter[key]))
    );

    return this.httpClient.get(`${this.baseUrl}/QA/OqcDocument/Documents`, {
      params: params,
    });
  }

  public deleteDocument(id: number): Observable<any> { 
    return this.httpClient.delete(`${this.baseUrl}/QA/OqcDocument/Document/${id}`);
  }

  public getOqcDocumentTypes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/OqcDocument/DocumentTypes`);
  }

  public previewFile(file: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/QA/OqcDocument/Preview`,
      file,
      {
        responseType: 'arraybuffer' as 'json',
      }
    );
  }

  
  public downloadDocument(file: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/OqcDocument/Download`,
      file,
      { responseType: 'blob' }
    );
  }
}
