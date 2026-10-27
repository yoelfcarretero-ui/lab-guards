import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Factoría de guards: devuelve un CanActivateFn que exige el rol indicado
export const roleGuard = (allowedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (authService.hasRole(allowedRole)) {
      return true;
    }

    // Rol insuficiente: se redirige a la zona que le corresponde (p. ej. user -> /user-dashboard)
    return router.createUrlTree([authService.getHomeRoute()]);
  };
};
