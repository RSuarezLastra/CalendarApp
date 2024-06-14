import { useCalendarStore, useUiStore } from '../../hooks';



export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleClick = () => {
        startDeletingEvent();
    }

    return (
        <button
            onClick={handleClick}
            className="btn btn-danger fab-danger"
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
