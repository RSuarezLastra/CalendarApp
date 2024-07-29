import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { useAuthStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api/calendarApi";

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

    beforeEach(() => localStorage.clear());

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

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        })

        await act(async () => {
            await result.current.startLogin({ email: 'reer@fef3.com', password: '12345678' })
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

    test('starRegister debe de crear un usuario ', async () => {
        const newUser = { email: 'reer@fef.com', password: '12345678', name: 'Test User2' };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '123466485634543',
                name: 'Test User',
                token: 'ALGUN-TOKEN-12314324'
            }
        })

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { uid: '123466485634543', name: 'Test User' }
        });

        spy.mockRestore();
    });

    test('starRegister debe fallar la creación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });


        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Ya existe un Usuario con este email',
            status: 'not-authenticated',
            user: {}
        });

    });

    test('checkAuthToken debe fallar si no hay token', async () => {

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });


        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        })

    });

    test('checkAuthToken debe autenticar al usuario si hay token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });


        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            status: 'authenticated',
            user: {
                name: "TestUser",
                uid: "66928f2bd6816f050cc46047"
            },
            errorMessage: undefined,
        })

    });


});