import { authSlice, clearError, onLogin, onLogout } from '../../../src/store';
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {

    test('debe regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);

    });

    test('debe de realizar login', () => {

        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })

    });
    test('debe de realizar logout', () => {
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage,
        });

    });

    test('debe de limpiar el mensaje de error', ()=> {

        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearError());

        expect(newState.errorMessage).toBe(undefined);
    });
});