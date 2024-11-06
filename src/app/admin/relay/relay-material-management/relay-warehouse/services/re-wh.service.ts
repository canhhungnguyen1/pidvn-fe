import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReWhService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public getUsers(searchVo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Commons/Users`, searchVo);
  }

  // public getListPXK(): Observable<any> {
  //   return this.httpClient.get(
  //     `${this.baseUrl}/Relay/MaterialManagement/ReWh/PXKs`
  //   );
  // }

  // /**
  //  * Lấy các lots được xuất kho sang kho trung chuyển relay
  //  * @param slipNo số phiếu xuất kho
  //  * @returns
  //  */
  // public getLotsXuatKhoBySlipNo(slipNo: string): Observable<any> {
  //   return this.httpClient.get(
  //     `${this.baseUrl}/Relay/MaterialManagement/ReWh/PXK/${slipNo}`
  //   );
  // }

  // /**
  //  * Kho trung chuyển nhận NVL từ kho Warehouse
  //  * Api này sẽ insert data vào bảng relay_record với record_type = 'IM'
  //  * @param lots
  //  * @returns
  //  */
  // public receiveLotsFromWH(lots: any, slipNo: string): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/Relay/MaterialManagement/ReWh/ReceiveLotsFromWH?slipNo=${slipNo}`,
  //     lots
  //   );
  // }

  // /**
  //  * Lấy dữ liệu bảng relay_records
  //  * @param searchVo
  //  * @returns
  //  */
  // public getRelayWhRecords(searchVo: any): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/Relay/MaterialManagement/ReWh/RelayWhRecords`,
  //     searchVo
  //   );
  // }

  // /**
  //  * Kho RE-WH chuyển NVL vào LINE-WH
  //  * @param records danh sách các lots
  //  * @returns
  //  */
  // public sendMaterialToLineWh(records: any): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/Relay/MaterialManagement/ReWh/SendMaterialToLineWh`,
  //     records
  //   );
  // }

  // Version2

  // public getPartsByModel(model: string): Observable<any> {
  //   return this.httpClient.get(
  //     `${this.baseUrl}/Relay/MaterialManagement/Parts?model=${model}`
  //   );
  // }

  /**
   * Lấy các lots được xuất kho sang kho trung chuyển relay theo SlipNo
   * @param slipNo
   * @returns
   */
  // public getLotsBySlipNo(slipNo: string): Observable<any> {
  //   return this.httpClient.get(
  //     `${this.baseUrl}/Relay/MaterialManagement/PXK?slipNo=${slipNo}`
  //   );
  // }

  // public scanMaterial(obj: any): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/Relay/MaterialManagement/ScanMaterial`,
  //     obj
  //   );
  // }

  // public savePurWhRecords(lots: any): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/Relay/MaterialManagement/SavePurWhRecords`,
  //     lots
  //   );
  // }

  public getPurWhRecords(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialManagement/PurWhRecords`,
      searchVo
    );
  }

  public deletePurWhRecords(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/Relay/MaterialManagement/PurWhRecords/${id}`
    );
  }

  /**
   * VERSION 3
   */

  public getLines(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/Lines?productId=${productId}`
    );
  }

  public getSlips(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Relay/MaterialControl/Slips`);
  }

  public getMaterialsBySlipNo(slipNo: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/Slips/${slipNo}`
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

  public getPartsByModel(model: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/Parts?model=${model}`
    );
  }

  public savePurWhRecord(purWhRecord: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Relay/MaterialControl/SavePurWhRecord`,
      purWhRecord
    );
  }

  public generateSlipNo(recordType: string, username: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/GenerateSlipNo?recordType=${recordType}&username=${username}`
    );
  }

  public getSlipsRelayReturnWarehouse(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/SlipsRelayReturnWarehouse`
    );
  }

  public getSlipsRelayReturnWarehouseDetail(slipNo: any): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/SlipsRelayReturnWarehouse/${slipNo}`
    );
  }

  public deletePurWhRecordById(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/Relay/MaterialControl/DeletePurWhRecord/${id}`
    );
  }

  // /**
  //  * Khóa request nhận NVL từ Warehouse
  //  */
  // public lockRequest(regNo: string): Observable<any> {
  //   return this.httpClient.put(
  //     `${this.baseUrl}/Relay/MaterialControl/LockRequest/${regNo}`,
  //     {}
  //   );
  // }

  // /**
  //  * Lấy thông tin request
  //  * @param regNo
  //  * @returns
  //  */
  // public getPurWhHeader(regNo: string): Observable<any> {
  //   return this.httpClient.get(
  //     `${this.baseUrl}/Relay/MaterialControl/PurWhHeader/${regNo}`
  //   );
  // }

  getLotRequestAndLotReceive(requestNo: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Relay/MaterialControl/GetLotRequestAndLotReceive?requestNo=${requestNo}`
    );
  }
}
