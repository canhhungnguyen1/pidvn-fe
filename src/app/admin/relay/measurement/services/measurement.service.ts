import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getQaCard(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Commons/QaCards`
    );
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Commons/Users`
    );
  }

  public getModels(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Commons/Models`
    );
  }

  public getReasons(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Commons/Reasons`
    );
  }

  public getItems(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/Measurement/Items`);
  }

  public getItemById(item: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Items/${item}`
    );
  }

  public getItemImages(item: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Images?item=${item}`
    );
  }

  public getItemImagesV2(item: number, modelType: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/ImagesV2?item=${item}&modelType=${modelType}`
    );
  }

  public removeImage(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/Relay/Measurement/DeleteImage?id=${id}`);
  }

  public getStandard(item: number, modelType: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/Standard?itemId=${item}&modelType=${modelType}`
    );
  }

  public saveMeasureData(measureData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/SaveMeasureData`,
      measureData
    );
  }

  public getMasterData(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/MasterData`,
      searchParams
    );
  }

  public getDetailData(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/DetailData`,
      searchParams
    );
  }

  public getChildItems(item: number, modelType: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/ChildItems?item=${item}&modelType=${modelType}`
    );
  }

  public approveData(master: number, user: string) {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/Measurement/ApproveData?master=${master}&username=${user}`
    );
  }

  public quickApprove(masterDataList: any, approver: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/ApproveData?approver=${approver}`,
      masterDataList
    );
  }

  public updateDetailData(editData: any) {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/UpdateDetailData`,
      editData
    );
  }

  public exportMeasureData(searchParams: any): Observable<Blob> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/Measurement/ExportData`,
      searchParams,
      { responseType: 'blob' }
    );
  }

  public showGuideline() {
    return this.httpClient.get<any>(`${this.baseUrl}/Relay/Measurement/GuideLines`, {
      responseType: 'arraybuffer' as 'json',
    });
  }
}
