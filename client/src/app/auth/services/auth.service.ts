import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { response } from "express";
import { environment } from "../../../environments/environment.development";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    getUser(response: AuthResponseInterface): CurrentUserInterface {
        return response.user;
    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users';

        return this.httpClient.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login';

        return this.httpClient.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/user';
        return this.httpClient.get<AuthResponseInterface>(url).pipe(map(this.getUser));
    }
}