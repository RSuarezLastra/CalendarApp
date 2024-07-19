import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store";
import { calendarWithActiveEventState, calendarWithEventsState, initialState, events } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('debe regresar el initialState', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '2',
            title: 'Reunion de planeacion',
            start: new Date('2024-08-10 13:00:00'),
            end: new Date('2024-08-10 15:00:00'),
            notes: 'En la oficina del cliente',

        }
        
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent debe de agregar el evento', () => {
        const updatedEvent = {
            id: '1',
            title: 'Cumpleaños del jefe',
            start: new Date('2024-08-09 13:00:00'),
            end: new Date('2024-08-09 15:00:00'),
            notes: 'Traer Refrescos y  bebidas',

        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());

        expect(state.activeEvent).toBeNull();
        expect(state.events).not.toContain(events[0]);
    });


    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvent(events));
        
        expect(state.events).toEqual(events);
        expect(state.isLoadingEvents).toBeFalsy();
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());

        expect(state).toEqual(initialState);
    });


})