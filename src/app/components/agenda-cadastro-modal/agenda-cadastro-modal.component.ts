import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-agenda-cadastro-modal',
    templateUrl: './agenda-cadastro-modal.component.html',
    styleUrls: ['./agenda-cadastro-modal.component.css'],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class AgendaCadastroModalComponent implements OnInit {
    data: Date;
    horaStart: Date;
    horaEnd: Date;

    masks = {
        mask: [
          {
            mask: '(00) 0000-0000'
          },
          {
            mask: '(00) 00000-0000'
          }
        ]
      };

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit() {
        if (this.config.data.id != null) {
            //buscar Datas
        } else {
            this.data = this.config.data.dateStart;
            this.horaStart = this.config.data.dateStart;
            this.horaEnd = this.config.data.dateEnd;
        }
    }

    salvarAgenda(){
        console.log("SALVAR");
        this.ref.close();
    }

    closeAgenda() {
        console.log("FECHAR");
        this.ref.close();
    }

    removerAgenda(){
        console.log("REMOVER");
        const id = this.config.data.id;
        console.log(id);

    }
}
