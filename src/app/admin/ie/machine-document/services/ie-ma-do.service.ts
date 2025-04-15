import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IeMaDoService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getMachines(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/Machine/Machines`);
  }

  getMachinesFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/IE/Machine/Files`);
  }

  uploadFile(files: File[], fileInfo: any): Observable<any> {
    const formData = new FormData();

    // Đính kèm từng file vào formData (tên phải trùng với @RequestPart hoặc @RequestParam trong Spring Boot)
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    // Đính kèm thông tin file dưới dạng JSON
    const jsonBlob = new Blob([JSON.stringify(fileInfo)], {
      type: 'application/json',
    });
    formData.append('fileInfo', jsonBlob);

    // Gửi POST request
    return this.httpClient.post(`${this.baseUrl}/IE/Machine/File`, formData);
  }
}
