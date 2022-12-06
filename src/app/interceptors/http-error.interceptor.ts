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
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.message}`;
                        this.toastr.error(errorMessage, 'Client Error');
                    } else {
                        // server-side error
                        errorMessage = `${error.error.message}`;
                        this.toastr.error(errorMessage, `${error.status} Error`);

                        switch (error.status) {
                            case 401:      //login
                                this.router.navigateByUrl("auth/login");
                                break;
                            case 403:     //forbidden
                                this.router.navigateByUrl("/unauthorized");
                                break;
                            case 0:
                                this.toastr.error('Không thể kết nối đến Server', `${error.status} Error`);
                                break;
                        }

                    }
                    return throwError(errorMessage);
                })
            )
    }

}
