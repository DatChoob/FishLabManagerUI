import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


    constructor(private router: Router, private authService: AuthService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token)
        });
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(this.addToken(req, localStorage.getItem("access_token")))
            .pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>error).status) {
                            case 401:
                                if(this.router.url != "/login"){
                                    this.authService.logout();
                                    return throwError("You have been logged out.")
                                    //break;
                                }
                            default:
                                return throwError(error);
                        }
                    } else {
                        return throwError(error);
                    }


                })
            );
    }


}