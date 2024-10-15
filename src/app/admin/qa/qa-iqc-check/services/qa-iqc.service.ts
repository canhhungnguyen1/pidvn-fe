import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QaIqcService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getIqcRequests(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/Requests`,
      searchVo
    );
  }

  public handleIqcRequest(iqcRequest: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/QA/IqcCheck/Request`,
      iqcRequest
    );
  }

  public getIqcDataMaster(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/IqcDataMaster`,
      searchVo
    );
  }

  public getIqcDataDetail(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/IqcDataDetail`,
      searchVo
    );
  }

  public saveIqcData(iqcData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/SaveIqcData`,
      iqcData
    );
  }

  public saveIqcDataMaster(iqcData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/SaveIqcDataMaster`,
      iqcData
    );
  }

  public saveIqcDataDetail(iqcData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/SaveIqcDataDetail`,
      iqcData
    );
  }

  public evaluateGeneral(iqcRequest: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/EvaluateGeneral`,
      iqcRequest
    );
  }

  public updateIqcRequest(requestNo: string, status: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/UpdateIqcRequest?requestNo=${requestNo}&status=${status}`
    );
  }

  public deleteIqcDataDetail(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/QA/IqcCheck/DeleteIqcDataDetail?id=${id}`
    );
  }

  public exportExcel(requestNo: string, invoice: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/ExportExcel?requestNo=${requestNo}&invoice=${invoice}`,
      { responseType: 'blob' }
    );
  }

  public getConfigAudit(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/IqcCheck/ConfigAudit`);
  }

  public changeConfigAudit(configValue: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/ChangeConfigAudit?configValue=${configValue}`
    );
  }

  // Thêm phần sorting
  public getIqcDataSortingMaster(requestNo: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/IqcDataSortingMaster/${requestNo}`
    );
  }

  public getIqcDataSortingDetail(
    requestNo: any,
    lotGroup: any
  ): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/IqcDataSortingDetail/${requestNo}?lotGroup=${lotGroup}`
    );
  }

  public saveIqcDataSortingMaster(iqcData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/SaveIqcDataSortingMaster`,
      iqcData
    );
  }

  public saveIqcDataSortingDetail(iqcData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IqcCheck/SaveIqcDataSortingDetail`,
      iqcData
    );
  }

  public deleteIqcDataSortingDetail(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/QA/IqcCheck/DeleteIqcDataSortingDetail?id=${id}`
    );
  }

  public getMucDoKiemSoat(model: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IqcCheck/GetMucDoKiemSoat?model=${model}`
    );
  }

  public getIqcLevelOfControl(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/QA/IqcCheck/LevelOfControls`);
  }

  // Lấy danh sách hàng iqc quá 6 tháng

  public getLotIqcOver6Month(
    requetNo: string,
    goodsType: string
  ): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/QA/IQC-Recheck/Requests/${requetNo}?goodsType=${goodsType}`
    );
  }

  public saveIqcResult(lots: any, goodsType: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/QA/IQC-Recheck/SaveIqcResult?goodsType=${goodsType}`,
      lots
    );
  }
}
