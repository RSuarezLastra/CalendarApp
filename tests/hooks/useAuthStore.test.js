import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { useAuthStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";

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

    test('startLogin debe registar al usuario', async () => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        })

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        })

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            status: 'authenticated',
            user: { uid: '66928f2bd6816f050cc46047', name: 'TestUser' },
            errorMessage: undefined,
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    });

    test('startLogin debe fallar', async () => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        })

        await act(async () => {
            await result.current.startLogin({ email: 'reer@fef.com', password: '12345678' })
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Credenciales incorrectas',
        })

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('token-init-date')).toBeNull();

    });


});