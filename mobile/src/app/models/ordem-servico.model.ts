import { Equipamento } from './equipamento.model';

export enum StatusOS {
    Aberta = 0,
    Finalizada = 1
}

export interface OrdemServico {
    id: number;
    equipamentoId: number;
    descricao: string;
    dataAbertura: Date;
    dataFinalizacao?: Date;
    status: StatusOS;
    equipamento?: Equipamento;
}
