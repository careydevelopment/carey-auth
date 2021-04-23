import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from './models/auth-config';
import { AUTH_CONFIG_TOKEN } from './models/token';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
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
