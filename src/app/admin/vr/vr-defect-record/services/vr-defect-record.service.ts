import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VrDefectRecordService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getProcessByLine(line: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/VR/DefectRecord/Process?line=${line}`);
  }

  getDefectRecords(processId: number, lotNo: string):Observable<any> { 
    return this.httpClient.get(`${this.baseUrl}/VR/DefectRecord/DefectRecords?processId=${processId}&lotNo=${lotNo}`);
  }

  saveDefectRecords(defectRecords:any):Observable<any> {  
    return this.httpClient.post(`${this.baseUrl}/VR/DefectRecord/DefectRecords`, defectRecords)
  }
}
