import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'


const tempEvent = {
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        id: 1,
        name: 'juan'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        increment: (state) => {

        },
    },
})

export const { increment } = calendarSlice.actions
