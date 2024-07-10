import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvent } from "../store";
import { calendarApi } from "../api/calendarApi";
import { convertEventsTodate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));

        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg);
        }

    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('events');
            const events = convertEventsTodate(data.events);
            dispatch(onLoadEvent(events));
        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    return {
        //?  PROPERTIES
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //?  METHODS
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
