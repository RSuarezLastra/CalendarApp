import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, CalendarModal, Navbar } from "../"
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events } = useCalendarStore();

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week')

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
        console.log({click: event});
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

            <CalendarModal/>
        </>
    )
}
