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

  getUsers() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/Users`);
  }

  getSpareParts() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SpareParts`);
  }

  getSparePartRecords() {
    return this.httpClient.get(`${this.baseUrl}/SparePart/SparePartRecords`);
  }

  saveSparePartRecord(sparePartRecord: any) {
    return this.httpClient.post(
      `${this.baseUrl}/SparePart/SparePartRecord`,
      sparePartRecord
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
