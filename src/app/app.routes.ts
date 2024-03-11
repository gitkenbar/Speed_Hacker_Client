import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    loadComponent: ()=> import("./features/auth/login/login.component").then((c) => c.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: ()=> import("./features/auth/login/login.component").then((c) => c.LoginComponent)
  },
  {
    path: 'list',
    loadComponent: ()=> import("./features/games/list/list.component").then((c) => c.ListComponent)
  },
  {
    path: 'create',
    loadComponent: ()=> import("./features/games/create/create.component").then((c) => c.CreateComponent)
  }
];
