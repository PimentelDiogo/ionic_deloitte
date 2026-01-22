import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrdemServico } from '../models/ordem-servico.model';

@Injectable({
    providedIn: 'root'
})
export class OrdemServicoService {
    private readonly API_URL = `${environment.apiUrl}/ordens-servico`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<OrdemServico[]> {
        return this.http.get<OrdemServico[]>(this.API_URL);
    }

    getById(id: number): Observable<OrdemServico> {
        return this.http.get<OrdemServico>(`${this.API_URL}/${id}`);
    }

    create(ordemServico: Partial<OrdemServico>): Observable<OrdemServico> {
        return this.http.post<OrdemServico>(this.API_URL, ordemServico);
    }

    finalizar(id: number): Observable<any> {
        return this.http.patch(`${this.API_URL}/${id}/finalizar`, {});
    }
}
