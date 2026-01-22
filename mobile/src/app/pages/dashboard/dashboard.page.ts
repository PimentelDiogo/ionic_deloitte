import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listOutline, constructOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { OrdemServico, StatusOS } from '../../models/ordem-servico.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol,
    CommonModule
  ]
})
export class DashboardPage implements OnInit {
  ordensServico: OrdemServico[] = [];
  osAbertas = 0;
  osFinalizadas = 0;

  constructor(
    private authService: AuthService,
    private ordemServicoService: OrdemServicoService,
    private router: Router
  ) {
    addIcons({ listOutline, constructOutline, logOutOutline });
  }

  ngOnInit() {
    // Carregamento inicial
  }

  ionViewWillEnter() {
    this.loadResumo();
  }

  loadResumo() {
    this.ordemServicoService.getAll().subscribe({
      next: (data) => {
        this.ordensServico = data;
        this.osAbertas = data.filter(os => os.status === StatusOS.Aberta).length;
        this.osFinalizadas = data.filter(os => os.status === StatusOS.Finalizada).length;
      },
      error: (error) => console.error('Erro ao carregar resumo:', error)
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToOS() {
    this.router.navigate(['/ordens-servico']);
  }

  navigateToEquipamentos() {
    this.router.navigate(['/equipamentos']);
  }
}
