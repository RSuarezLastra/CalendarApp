import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from "../"
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    useEffect(() => {
        startLoadingEvents()
    }, [])


    const evetStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = ( user.uid === event.user._id) || (user.uid === event.user.uid);
        
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660' ,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }
    const onViewChange = (event) => {
        localStorage.setItem('lastView', event);
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={evetStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={openDateModal}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
