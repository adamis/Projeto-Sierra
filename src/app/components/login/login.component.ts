import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;

  config: AppConfig;

  subscription: Subscription;

  constructor(
        public configService: ConfigService,
        private loginService: LoginService,
        private messageService: MessageService,
        private router: Router
    ){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


  login(usuario: string) {
    this.loginService.login(usuario, this.password)
        .then((resultado) => {

            console.log(resultado);

            if (resultado != null) {
                console.log(JSON.stringify(resultado));
                sessionStorage.setItem(
                    'usuario',
                    JSON.stringify(resultado)
                );
                this.router.navigate(['dashboard']);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: resultado.error.message,
                    sticky: false,
                    life: 15000,
                });
            }
        })
        .catch((erroResponse) => {
            console.log(erroResponse);

            this.messageService.add({
                severity: 'error',
                summary: 'Atenção',
                detail: erroResponse.error,
                sticky: false,
                life: 15000,
            });
        });
}

}
