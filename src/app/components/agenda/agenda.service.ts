import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

    constructor(private http: HttpClient) {}

    getEvents() {
        return this.http.get(environment.apiUrl + 'api/eventos/findAll',)
                    .toPromise()
                    .then(res => res)
                    .then(data => { return data; });
    }
}
