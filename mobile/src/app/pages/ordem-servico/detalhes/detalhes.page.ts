import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonItem, IonLabel,
  IonBadge, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { OrdemServicoService } from '../../../services/ordem-servico.service';
import { OrdemServico, StatusOS } from '../../../models/ordem-servico.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonButton, IonIcon, IonItem, IonLabel,
    IonBadge, IonGrid, IonRow, IonCol,
    CommonModule
  ]
})
export class DetalhesPage implements OnInit {
  ordemServico?: OrdemServico;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordemServicoService: OrdemServicoService
  ) {
    addIcons({ arrowBackOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadOrdemServico(id);
    }
  }

  loadOrdemServico(id: number) {
    this.ordemServicoService.getById(id).subscribe({
      next: (data) => {
        this.ordemServico = data;
      },
      error: (error) => {
        console.error('Erro ao carregar OS:', error);
        this.voltar();
      }
    });
  }

  finalizar() {
    if (this.ordemServico && this.ordemServico.status === StatusOS.Aberta) {
      this.isLoading = true;
      this.ordemServicoService.finalizar(this.ordemServico.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.loadOrdemServico(this.ordemServico!.id);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao finalizar OS:', error);
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/ordens-servico']);
  }

  getStatusColor(status: StatusOS): string {
    return status === StatusOS.Aberta ? 'warning' : 'success';
  }

  getStatusText(status: StatusOS): string {
    return status === StatusOS.Aberta ? 'Aberta' : 'Finalizada';
  }
}
