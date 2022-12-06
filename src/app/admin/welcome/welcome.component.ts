import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService],
})
export class WelcomeComponent implements OnInit {
  constructor(private welcomeSvc: WelcomeService) {}

  weatherUrl: string = 'https://www.weatherbit.io/static/img/icons/';

  ngOnInit(): void {
    // this.getTemp();
  }

  weatherInfo: any;

  getTemp() {
    this.welcomeSvc.getTemp().subscribe((response) => {
      this.weatherInfo = response.data[0];
    });
  }
}
