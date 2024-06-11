import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, Navbar } from "../"
import { useState } from 'react';


const events = [{
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        id: 1,
        name: 'juan'
    }

}]

export const CalendarPage = () => {

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

    const onDoubleClick = (event) => {
        console.log({doubleClick: event});
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
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />
        </>
    )
}
