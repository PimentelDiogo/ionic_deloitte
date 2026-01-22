import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Não adiciona token para rotas de login
        if (request.url.includes('/auth/login')) {
            return next.handle(request);
        }

        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                return next.handle(request);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Token expirado ou inválido
                    this.authService.logout();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}
