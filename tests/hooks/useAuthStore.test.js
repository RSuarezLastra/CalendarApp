import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { authSlice } from "../../src/store";
import { initialState } from "../fixtures/authStates";
import { useAuthStore } from "../../src/hooks";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAuthStore', () => {

    test('debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        })

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });

    });
});