import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {
  private previousUrl!: string | null;
  private currentUrl!: string | null;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
