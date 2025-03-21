import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegModComponent } from './components/reg-mod/reg-mod.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate } from './RouteGuards/routeGuard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegModComponent},
    {path: 'dashBoard', component: DashBoardComponent, canActivate : [canActivate]}
];
