import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
    providedIn: 'root'
})
export class EquipamentoService {
    private readonly API_URL = `${environment.apiUrl}/equipamentos`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Equipamento[]> {
        return this.http.get<Equipamento[]>(this.API_URL);
    }

    getById(id: number): Observable<Equipamento> {
        return this.http.get<Equipamento>(`${this.API_URL}/${id}`);
    }

    create(equipamento: Partial<Equipamento>): Observable<Equipamento> {
        return this.http.post<Equipamento>(this.API_URL, equipamento);
    }

    update(id: number, equipamento: Partial<Equipamento>): Observable<void> {
        return this.http.put<void>(`${this.API_URL}/${id}`, equipamento);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
