import { routes } from './app.routes';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { of } from 'rxjs';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';

/* export function initializedUserData(
  userService:UserService,
  authService:AuthService
  ){

  if(authService.isLoggedIn()){
    return () => userService.getBootstrapData().subscribe();
  }else {
    return () => of(null);
  }
} */

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    /* {
      provide: APP_INITIALIZER,
      useFactory: initializedUserData,
      deps: [UserService, AuthService],
      multi: true
    }, */
    provideHttpClient(withInterceptors([authInterceptor]))],
};
