import { AgendaCadastroModalComponent } from './../agenda-cadastro-modal/agenda-cadastro-modal.component';
import { Component, OnInit } from '@angular/core';
import {
    CalendarOptions,
    DateSelectArg,
    EventApi,
    EventClickArg,
    EventInput,
} from '@fullcalendar/angular'; // useful for typechecking
import ptbrLocale from '@fullcalendar/core/locales/pt-br';
import { DialogService } from 'primeng/dynamicdialog';
import { AgendaService } from './agenda.service';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
    calendarVisible = true;
    calendarOptions: CalendarOptions;

    constructor(
        public agendaService: AgendaService,
        public dialogService: DialogService
    ) {
        this.calendarOptions = { initialView: 'timeGridWeek' };
    }

    INITIAL_EVENTS: EventInput[] = [
        {
            title: 'All-day event',
            start: 'TODAY_STR',
        },
        {
            title: 'Timed event',
            start: 'TODAY_STR' + 'T12:00:00',
        },
    ];

    ngOnInit(): void {
        this.loadCalendar();

        //REMOVER DPS
        this.showAgendaMsg();
    }

    loadCalendar(){
        this.agendaService.getEvents().then((events) => {
            this.calendarOptions = {
                locale: ptbrLocale,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                },
                initialView: 'timeGridWeek',
                initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                weekends: true,
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                events: events,
                select: this.handleDateSelect.bind(this),
                eventsSet: this.handleEvents.bind(this),
                eventClick: this.handleEventClick.bind(this),
                /* you can update a remote database when these fire:
            eventAdd:
            eventChange:
            eventRemove:
            */
            };
        });
    }

    currentEvents: EventApi[] = [];

    handleCalendarToggle() {
        this.calendarVisible = !this.calendarVisible;
    }

    handleWeekendsToggle() {
        const { calendarOptions } = this;
        calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        //const calendarApi = selectInfo.view.calendar;

        console.log('handleDateSelect');
        console.log(selectInfo);

        this.showAgendaMsg(null,selectInfo.start,selectInfo.end);

        /*
        console.log(selectInfo.start);
        console.log(selectInfo.startStr);

        console.log(selectInfo.end);
        console.table(selectInfo.endStr);
        */
        /*
      const title = prompt('Por favor entre com um novo titulo');


      calendarApi.unselect(); // clear date selection

      if (title) {

        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });

      }

      */
    }

    showAgendaMsg(id?, start?, end?){
        const ref = this.dialogService.open(AgendaCadastroModalComponent, {
            data: {
                id: id,
                dateStart: start,
                dateEnd: end,
            },
            header: 'Agenda',
            width: '60%',
            contentStyle: { overflow: 'unset' }
        });

        ref.onClose.subscribe(() => {
            this.loadCalendar();
        });
    }

    handleEventClick(clickInfo: EventClickArg) {
        console.log(clickInfo);
        console.log(clickInfo.event);
        console.log(clickInfo.event.title);
        console.log(clickInfo.event.id);

        this.showAgendaMsg(clickInfo.event.id, null, null)

    }
    handleEvents(events: EventApi[]) {
        console.log(events);

        this.currentEvents = events;
    }
}
