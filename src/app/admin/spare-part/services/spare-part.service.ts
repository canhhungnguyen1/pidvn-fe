import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getSpareParts() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SpareParts`);
  }

  saveSparePart(sparePart: any) {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePart`,
      sparePart
    );
  }

  getSparePartRecords() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartRecords`);
  }

  /**
   * Lưu list spare part
   * @param sparePartRecords list spare part
   * @returns 
   */
  saveSparePartRecords(sparePartRecords: any) {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePartRecords`,
      sparePartRecords
    );
  }

  getSparePartInventoryRequests() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartInventoryRequests`);
  }

  saveSparePartInventoryRequest(request: any) {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePartInventoryRequest`,
      request
    );
  }



}
