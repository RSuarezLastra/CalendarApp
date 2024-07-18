
export const events = [
    {
        id: '1',
        title: 'Cumpleaños del jefe',
        start: new Date('2024-08-09 13:00:00'),
        end: new Date('2024-08-09 15:00:00'),
        notes: 'Hay que comprar el pastel',
    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}
export const calendarWithEventsState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: {...events[0]},
}