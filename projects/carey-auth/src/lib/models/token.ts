import { InjectionToken } from '@angular/core';
import { AuthConfig } from './auth-config';

export const AUTH_CONFIG_TOKEN = new InjectionToken<AuthConfig>('AUTH_CONFIG');
