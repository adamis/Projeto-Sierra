import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { MessagesComponent } from './components/messages/messages.component';
import { EmptyComponent } from './components/empty/empty.component';
import { FileComponent } from './components/file/file.component';
import { AppMainComponent } from './app.main.component';
import { ButtonComponent } from './components/button/button.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AgendaComponent } from './components/agenda/agenda.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'', component: LandingComponent},
            {path:'auth', component: LoginComponent},
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'pages/agenda', component: AgendaComponent},

                ],
            },

            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
