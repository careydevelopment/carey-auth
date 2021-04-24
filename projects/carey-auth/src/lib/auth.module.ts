import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from './models/auth-config';
import { AUTH_CONFIG_TOKEN } from './models/token';
import { CommonModule } from '@angular/common';
import { MatShortVerticalLoginComponent } from './components/mat-short-vertical-login/mat-short-vertical-login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'carey-alert';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    MatShortVerticalLoginComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AlertModule,
  ],
  exports: [
    MatShortVerticalLoginComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [{ provide: AUTH_CONFIG_TOKEN, useValue: config }]
    };
  }
}
