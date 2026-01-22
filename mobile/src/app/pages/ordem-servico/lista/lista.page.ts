import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonBadge, IonButton, IonIcon, IonSearchbar, IonSegment,
  IonSegmentButton, IonRefresher, IonRefresherContent, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, arrowBackOutline } from 'ionicons/icons';
import { OrdemServicoService } from '../../../services/ordem-servico.service';
import { OrdemServico, StatusOS } from '../../../models/ordem-servico.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonLabel, IonBadge, IonButton, IonIcon, IonSearchbar, IonSegment,
    IonSegmentButton, IonRefresher, IonRefresherContent, IonFab, IonFabButton,
    CommonModule
  ]
})
export class ListaPage implements OnInit {
  ordensServico: OrdemServico[] = [];
  ordensServicoFiltradas: OrdemServico[] = [];
  filtroStatus: string = 'todas';
  searchTerm: string = '';

  constructor(
    private ordemServicoService: OrdemServicoService,
    private router: Router
  ) {
    addIcons({ addOutline, arrowBackOutline });
  }

  ngOnInit() {
    this.loadOrdensServico();
  }

  loadOrdensServico() {
    this.ordemServicoService.getAll().subscribe({
      next: (data) => {
        this.ordensServico = data;
        this.aplicarFiltros();
      },
      error: (error) => console.error('Erro ao carregar OS:', error)
    });
  }

  aplicarFiltros() {
    let resultado = [...this.ordensServico];

    // Filtro por status
    if (this.filtroStatus === 'abertas') {
      resultado = resultado.filter(os => os.status === StatusOS.Aberta);
    } else if (this.filtroStatus === 'finalizadas') {
      resultado = resultado.filter(os => os.status === StatusOS.Finalizada);
    }

    // Filtro por busca
    if (this.searchTerm) {
      resultado = resultado.filter(os =>
        os.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        os.equipamento?.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.ordensServicoFiltradas = resultado;
  }

  onSegmentChange(event: any) {
    this.filtroStatus = event.detail.value;
    this.aplicarFiltros();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.aplicarFiltros();
  }

  handleRefresh(event: any) {
    this.loadOrdensServico();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  verDetalhes(id: number) {
    this.router.navigate(['/ordens-servico', id]);
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  criarNovaOS() {
    this.router.navigate(['/ordens-servico/criar']);
  }

  getStatusColor(status: StatusOS): string {
    return status === StatusOS.Aberta ? 'warning' : 'success';
  }

  getStatusText(status: StatusOS): string {
    return status === StatusOS.Aberta ? 'Aberta' : 'Finalizada';
  }
}
