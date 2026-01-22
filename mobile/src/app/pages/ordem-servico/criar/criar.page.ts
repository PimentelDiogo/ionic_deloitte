import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,
    IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline } from 'ionicons/icons';
import { OrdemServicoService } from '../../../services/ordem-servico.service';
import { EquipamentoService } from '../../../services/equipamento.service';
import { Equipamento } from '../../../models/equipamento.model';

@Component({
    selector: 'app-criar',
    templateUrl: './criar.page.html',
    styleUrls: ['./criar.page.scss'],
    standalone: true,
    imports: [
        IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,
        IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButtons, IonBackButton,
        CommonModule, ReactiveFormsModule
    ]
})
export class CriarPage implements OnInit {
    ordemServicoForm: FormGroup;
    equipamentos: Equipamento[] = [];
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ordemServicoService: OrdemServicoService,
        private equipamentoService: EquipamentoService
    ) {
        addIcons({ arrowBackOutline, saveOutline });

        this.ordemServicoForm = this.fb.group({
            equipamentoId: ['', Validators.required],
            descricao: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit() {
        this.loadEquipamentos();
    }

    loadEquipamentos() {
        this.equipamentoService.getAll().subscribe({
            next: (data) => {
                // Filtrar apenas equipamentos ativos
                this.equipamentos = data.filter(e => e.ativo);
            },
            error: (error) => console.error('Erro ao carregar equipamentos:', error)
        });
    }

    salvar() {
        if (this.ordemServicoForm.valid) {
            this.isLoading = true;
            const formValue = this.ordemServicoForm.value;

            this.ordemServicoService.create(formValue).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.router.navigate(['/ordens-servico']);
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error('Erro ao criar OS:', error);
                    alert('Erro ao criar ordem de serviço. Tente novamente.');
                }
            });
        } else {
            // Marcar todos os campos como touched para mostrar erros
            Object.keys(this.ordemServicoForm.controls).forEach(key => {
                this.ordemServicoForm.get(key)?.markAsTouched();
            });
        }
    }

    cancelar() {
        this.router.navigate(['/ordens-servico']);
    }

    get equipamentoId() {
        return this.ordemServicoForm.get('equipamentoId');
    }

    get descricao() {
        return this.ordemServicoForm.get('descricao');
    }
}
