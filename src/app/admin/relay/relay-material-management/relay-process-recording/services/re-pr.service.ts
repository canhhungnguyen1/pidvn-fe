import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RePrService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Commons/Users`, searchVo);
  }

  /**
   * Version 2
   */

  public getPurWhRecords(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialManagement/PurWhRecords`,
      searchVo
    );
  }

  public scanMaterial(obj: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialManagement/ScanMaterial`,
      obj
    );
  }

  public savePurWhRecords(lots: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialManagement/SavePurWhRecords`,
      lots
    );
  }

  public deletePurWhRecords(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/Relay/MaterialManagement/PurWhRecords/${id}`
    );
  }

  public saveInspectQACard(inspectQaCard: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialManagement/InspectQACard`,
      inspectQaCard
    );
  }

  public getInspectQACards(inspectQaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialManagement/InspectQACards/${inspectQaCard}`
    );
  }

  public deleteInspectQaCard(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/Relay/MaterialManagement/InspectQACards/${id}`
    );
  }

  // Ver 3

  public getPartsByModel(model: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/Parts?model=${model}`
    );
  }

  public getProcesses(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/Processes`
    );
  }

  public mappingQaCard(obj: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/MappingQaCard`,
      obj
    );
  }

  public getChildQaCards(parentQaCard: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/ChildQaCards?parentQaCard=${parentQaCard}`
    );
  }

  public deleteChildQaCard(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/Relay/MaterialControl/ChildQaCards/${id}`
    );
  }

  public getMaterials(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/Materials`,
      searchVo
    );
  }

  public scanMaterialV3(obj: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/ScanMaterial`,
      obj
    );
  }

  public saveMaterials(materials: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/SaveMaterials`,
      materials
    );
  }

  public deleteMaterial(material: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/DeleteMaterial`,
      material
    );
  }

  public editMaterialControl(material: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/EditMaterialControl`,
      material
    );
  }

  public changeQaCard(oldQaCard: string, newQaCard: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/ChangeQaCard?oldQaCard=${oldQaCard}&newQaCard=${newQaCard}`,
      {}
    );
  }
}
