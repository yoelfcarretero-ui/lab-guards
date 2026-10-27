import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'admin' | 'user';

export interface AuthSession {
  username: string;
  role: UserRole;
  isAuthenticated: boolean;
}

interface UserCredentials {
  username: string;
  password: string;
  role: UserRole;
}

const STORAGE_KEY = 'DAM2_AUTH_SESSION';

// Usuarios simulados del sistema (en un caso real vendrían de un backend)
const USERS: UserCredentials[] = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'operador', password: '123', role: 'user' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session = signal<AuthSession | null>(this.restoreSession());

  public readonly currentUser = this.session.asReadonly();
  public readonly isAuthenticated = computed(() => this.session()?.isAuthenticated === true);

  public login(username: string, password: string): boolean {
    const user = USERS.find(u => u.username === username.trim() && u.password === password);
    if (!user) {
      return false;
    }

    const session: AuthSession = { username: user.username, role: user.role, isAuthenticated: true };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.session.set(session);
    return true;
  }

  public logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.session.set(null);
  }

  public hasRole(role: string): boolean {
    return this.isAuthenticated() && this.session()?.role === role;
  }

  // Ruta de inicio que corresponde a cada rol
  public getHomeRoute(): string {
    return this.session()?.role === 'admin' ? '/admin' : '/user-dashboard';
  }

  private restoreSession(): AuthSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
