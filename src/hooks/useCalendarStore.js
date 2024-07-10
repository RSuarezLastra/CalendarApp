import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api/calendarApi";
import { convertEventsTodate } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {

            const { data } = await calendarApi.post('/events', calendarEvent);

            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('events');
            const events = convertEventsTodate(data.events);
            console.log(events);
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
