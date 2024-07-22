import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { uiSlice } from "../../src/store";


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('pruebas en el useUiStore', () => {

    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({isDateModalOpen: false})

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function)
        });
    }); 
});