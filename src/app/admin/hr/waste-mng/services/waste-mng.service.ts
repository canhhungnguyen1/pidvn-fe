import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WasteMngService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getWasteGroup(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/WasteMng/WasteGroup`);
  }

  public getWasteType(wasteGroup: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/WasteMng/WasteType?wasteGroup=${wasteGroup}`
    );
  }

  public getHandleCompany(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/WasteMng/HandleCompany`);
  }

  public createWasteMasterData(masterVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/CreateWasteMasterData`,
      masterVo
    );
  }

  public getWasteMasterData(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/WasteMasterData`,
      searchVo
    );
  }

  public createWasteDetailData(detailVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/CreateWasteDetailData`,
      detailVo
    );
  }

  public getWasteDetailData(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/WasteDetailData`,
      searchVo
    );
  }

  public getWasteDetailDataSummary(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/WasteDetailDataSummary`,
      searchVo
    );
  }

  public getWasteDetailDataSummaryAll(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/WasteDetailDataSummaryAll`,
      searchVo
    );
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/HR/WasteMng/Users`);
  }

  public removeImage(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/HR/WasteMng/RemoveImage/${id}`
    );
  }

  public exportMasterData(masterId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/WasteMng/ExportMasterData?masterId=${masterId}`,
      { responseType: 'blob' }
    );
  }

  public exportChungTu(masterId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/HR/WasteMng/ExportChungTu?masterId=${masterId}`,
      { responseType: 'blob' }
    );
  }

  public setupUnitPrice(wasteMaster: number): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/SetupUnitPrice?wasteMaster=${wasteMaster}`,
      null
    );
  }

  public removeWasteMasterData(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/HR/WasteMng/WasteMasterData/${id}`
    );
  }

  public removeWasteDetailData(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/HR/WasteMng/WasteDetailData/${id}`
    );
  }

  public onExcelDownload(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/ExcelDownload`,
      searchVo,
      { responseType: 'blob' }
    );
  }

  getPdfReport(masterId: number) {
    return this.httpClient.get(
      `${this.baseUrl}/HR/WasteMng/ExportMasterData?masterId=${masterId}`,
      { responseType: 'blob' }
    );
  }

  getWasteTypeVer2(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/HR/WasteMng/WasteType/v2`,
      searchVo
    );
  }
}
