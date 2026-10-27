import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonInput, IonButton, IonText
} from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonInput, IonButton, IonText
  ]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  public username = '';
  public password = '';
  public errorMessage = '';

  public handleLogin(): void {
    this.errorMessage = '';
    const success = this.authService.login(this.username, this.password);

    if (success) {
      // Cada rol aterriza en su propio panel
      this.router.navigate([this.authService.getHomeRoute()]);
    } else {
      this.errorMessage = 'Credenciales no autorizadas. Use admin / 123 u operador / 123';
    }
  }
}
