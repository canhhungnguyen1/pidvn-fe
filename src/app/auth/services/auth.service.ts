import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private jwtHelper: JwtHelperService
    ) { }

    private baseUrl = environment.baseUrl;

    login(account: Account): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/Auth/login`, account);
    }

    getRoleAndPermission(username: string) : Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/Auth/RoleAndPermission?username=${username}`);
    }

    changePassword(username: any, passwordVo: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/Auth/ChangePassword/${username}`, passwordVo);
    }

    forgotPassword(account: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/Auth/ForgotPassword`, account);
    }

    isAuthenticated(): boolean {

        const accessToken = localStorage.getItem('accessToken');

        if (accessToken == null || accessToken === '' || accessToken == undefined) {
            return false;
        }

        return !this.jwtHelper.isTokenExpired(accessToken)
    }

    generateJWT(username: string): Observable<any>  {
        return this.httpClient.get(`${this.baseUrl}/Auth/GenerateJWT?username=${username}`);
    }

}