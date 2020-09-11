import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/movies/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'movies/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/movies/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'movies/edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/movies/edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
