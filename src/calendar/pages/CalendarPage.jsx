import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from "../"
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    useEffect(() => {
        startLoadingEvents()
    }, [])


    const evetStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#347CF7',
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
