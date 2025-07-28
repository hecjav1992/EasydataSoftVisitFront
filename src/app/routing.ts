import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { AppMovilComponent } from './app-movil/app-movil.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'App', component: AppMovilComponent },
  {
    path: 'panel',
    component: PanelComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponentComponent },
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);



