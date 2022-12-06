import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReMatAdmService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getLines(productId: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialManagement/Lines?productId=${productId}`
    );
  }

  public materialTraceability(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/Traceability`,
      searchVo
    );
  }

  public exportMaterials(searchVo: any) : Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/MaterialsExport`,
      searchVo
    );
  }

  public getQaCards(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/QaCards`
    );
  }

  public exportData(master: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/MaterialsExport`,
      master,
      { responseType: 'blob' }
    );
  }

  public editQtyImportedToLine(material: any) : Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/EditQtyImportedToLine`,
      material
    );
  }

}
