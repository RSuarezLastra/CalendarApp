import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent, Navbar } from "../"


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

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={evetStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />
        </>
    )
}
