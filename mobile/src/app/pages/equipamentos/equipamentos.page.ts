import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonSearchbar, IonBackButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { EquipamentoService } from '../../services/equipamento.service';
import { Equipamento } from '../../models/equipamento.model';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.page.html',
  styleUrls: ['./equipamentos.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonLabel, IonBadge, IonIcon, IonSearchbar, IonBackButton, IonButtons,
    CommonModule
  ]
})
export class EquipamentosPage implements OnInit {
  equipamentos: Equipamento[] = [];
  equipamentosFiltrados: Equipamento[] = [];
  searchTerm: string = '';

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router
  ) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.loadEquipamentos();
  }

  loadEquipamentos() {
    this.equipamentoService.getAll().subscribe({
      next: (data) => {
        this.equipamentos = data;
        this.aplicarFiltro();
      },
      error: (error) => console.error('Erro ao carregar equipamentos:', error)
    });
  }

  aplicarFiltro() {
    if (this.searchTerm) {
      this.equipamentosFiltrados = this.equipamentos.filter(eq =>
        eq.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        eq.descricao.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.equipamentosFiltrados = [...this.equipamentos];
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.aplicarFiltro();
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  getStatusColor(ativo: boolean): string {
    return ativo ? 'success' : 'medium';
  }

  getStatusText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
