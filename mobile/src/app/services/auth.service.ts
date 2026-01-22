import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly API_URL = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
            .pipe(
                tap(response => this.storage.set(this.TOKEN_KEY, response.token))
            );
    }

    async logout(): Promise<void> {
        await this.storage.remove(this.TOKEN_KEY);
    }

    async getToken(): Promise<string | null> {
        return this.storage.get(this.TOKEN_KEY);
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }
}
