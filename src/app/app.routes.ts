import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard('admin')], // Sesión activa + rol admin
    loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage)
  },
  {
    path: 'user-dashboard',
    canActivate: [authGuard, roleGuard('user')], // Sesión activa + rol user
    loadComponent: () => import('./pages/user-dashboard/user-dashboard.page').then(m => m.UserDashboardPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
