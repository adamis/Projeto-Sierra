import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    header = new HttpHeaders({
        //Authorization: 'Basic ' + btoa('codiub:C0D1UB'),
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient) {}

    login(usuario: string, senha: string): Promise<any> {
        const param = { usuario, senha };

        return this.http
            .post(
                environment.apiUrl + 'api/usuarios/login',
                JSON.stringify(param),
                { headers: this.header }
            )
            .toPromise()
            .then((response) => {
                return response;
            });
    }
}
