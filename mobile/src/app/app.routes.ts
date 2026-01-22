import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [authGuard]
  },
  {
    path: 'ordens-servico',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/ordem-servico/lista/lista.page').then(m => m.ListaPage)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/ordem-servico/detalhes/detalhes.page').then(m => m.DetalhesPage)
      }
    ]
  },
  {
    path: 'equipamentos',
    loadComponent: () => import('./pages/equipamentos/equipamentos.page').then(m => m.EquipamentosPage),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'lista',
    loadComponent: () => import('./pages/ordem-servico/lista/lista.page').then( m => m.ListaPage)
  },
  {
    path: 'detalhes',
    loadComponent: () => import('./pages/ordem-servico/detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
  {
    path: 'equipamentos',
    loadComponent: () => import('./pages/equipamentos/equipamentos.page').then( m => m.EquipamentosPage)
  }
];
