import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(0),
                catchError((error: HttpErrorResponse) => {
                    
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {

                        console.log('Client Error: ', error)

                        // client-side error
                        errorMessage = `Error: ${error.message}`;
                        this.toastr.error(errorMessage, 'Client Error');
                    } else {

                        console.log('Serer Error: ', error)

                        // server-side error
                        

                        switch (error.status) {
                            case 401:      //login
                                this.router.navigateByUrl("auth/login");
                                this.toastr.error('Đã hết phiên đăng nhập !', `Unauthorized`);
                                break;
                            case 403:     //forbidden
                                this.router.navigateByUrl("/unauthorized");
                                break;
                            case 0:
                                this.toastr.error('Không thể kết nối đến Server', `${error.status} Error`);
                                break;
                        }

                        errorMessage = `${error.error.message}`;
                        this.toastr.error(errorMessage, `${error.status} Error`);

                    }
                    return throwError(errorMessage);
                })
            )
    }

}
