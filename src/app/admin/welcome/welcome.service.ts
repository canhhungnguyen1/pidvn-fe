import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class WelcomeService {
  constructor(private httpClient: HttpClient) {}

  private openWeatherUrl = environment.weatherbit;

  getTemp(): Observable<any> {
    let lat='21.110758428724544'; 
    let lon='105.78321565409337';
    const url = `${this.openWeatherUrl}&lat=${lat}&lon=${lon}`;
    return this.httpClient.get(url);
  }
}
