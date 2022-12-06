import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    private baseUrl = environment.baseUrl;

    /**
     * Method để set header cho request
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let requestOption:any = {};

        let isLogin = localStorage.getItem('accessToken')
        
        if(isLogin) {
          
          if (request.url.startsWith(this.baseUrl)) {
            requestOption.setHeaders = {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        } 
    
        request = request.clone(requestOption); 
        return next.handle(request)
      }

}
