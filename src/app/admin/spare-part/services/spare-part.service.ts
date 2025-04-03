import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class SparePartService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  // getUsers() {
  //   return this.httpClient.get(`${this.baseUrl}/SparePart/Users`);
  // }

  getSpareParts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SpareParts`);
  }

  getSparePartsivt(scannedCode: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartsivt?code=${scannedCode}`, scannedCode);
  }


  getSparePartsivthis(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartsivthis`);
  }


  getSparePartsivtDetail(ivtNo: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartsivtdetail?ivtNo=${ivtNo}`, ivtNo);
  }

  saveSparePart(sparePart: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePart`,
      sparePart
    );
  }

  getSparePartRecords(searchParams: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/GetSparePartRecords`,
      searchParams
    );
  }

  /**
   * Lưu list spare part
   * @param sparePartRecords list spare part
   * @returns
   */
  saveSparePartRecords(sparePartRecords: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePartRecords`,
      sparePartRecords
    );
  }

  getSparePartInventoryRequests(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/SparePart/SparePartInventoryRequests`
    );
  }

  saveSparePartInventoryRequest(request: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePartInventoryRequest`,
      request
    );
  }

  saveSparePartIvt(request: any): Observable<any>  {
    console.log(request)
    return this.httpClient.post(`${this.baseUrl}/SparePart/SaveSparePartIvt`,request);
  }

  getLineStandard(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Lines`);
  }

  getMachineStandard(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Machines`);
  }

  /**
   * Kiem ke
   */

  getInventoryRequest(requestId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/SparePart/Inventory/Request/${requestId}`
    );
  }

  getInventoryData(requestId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/SparePart/Inventory/Data?requestId=${requestId}`
    );
  }

  getSparePartDataChart(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/SparePart/Charts`, searchVo);
  }


  updateSparePartRecord(sparePartRecord: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/SparePart/SparePartRecord`, sparePartRecord);
  }

  deleteSparePartRecord(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/SparePart/SparePartRecord/${id}`);
  }


  getSparePartRecordsByStandardPrice(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/SparePart/SparePartRecordsByStandardPrice`, searchVo);
  }
  

  changeRack(obj: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/SparePart/ChangeRack`, obj);
  }
  
}


