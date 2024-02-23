import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class QaTrainingMatrixService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrlPhp;
}
