import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaterialVo } from '../models/MaterialVo';
import { PurWhRecordsSearchVo } from '../models/PurWhRecordsSearchVo';

@Injectable({
  providedIn: 'root',
})
export class MaterialReceiptService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public saveMaterial(materials: Array<MaterialVo>): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/SaveMaterials`,
      materials
    );
  }

  public getMaterials(searchVo: PurWhRecordsSearchVo): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt`,
      searchVo
    );
  }

  public getLotsByLotNo(searchVo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/GetLotsByLotNo`,
      searchVo
    );
  }

  public saveBigBox(
    materials: Array<MaterialVo>,
    invoice: string
  ): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/SaveBigBox?invoice=${invoice}`,
      materials
    );
  }

  public findSlipByInvoice(invoice: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/Warehouse/Material/Receipt/Slip?invoice=${invoice}`
    );
  }

  public deleteRecord(purWhRecordsVo: any): Observable<any> {
    return this.httpClient.put(
      `${this.baseUrl}/Warehouse/Material/Receipt/Record`,
      purWhRecordsVo
    );
  }

  // Tem thung to Version 2
  public getDetailOuterLabel(outerLabels: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/DetailOuterLabel`,
      outerLabels
    );
  }

  public createPurWhHeader(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/CreatePurWhHeader`,
      data
    );
  }

  public getInvoiceDetail(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/Warehouse/Material/Receipt/InvoiceDetail`,
      data
    );
  }
}
