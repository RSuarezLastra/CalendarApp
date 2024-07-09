import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendatApi } from "../api/calendarApi";

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

            const { data } = await calendatApi.post('/events', calendarEvent);
            
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
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
    }
}
