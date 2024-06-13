import { useCalendarStore, useUiStore } from '../../hooks';
import { addHours } from 'date-fns';


export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                id: 1,
                name: 'juan'
            }
        });

        openDateModal();
    }

    return (
        <button
        onClick={handleNewEvent}
            className="btn btn-primary fab"
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
