import { authSlice } from '../../../src/store';
import { authStates, initialState } from '../../fixtures/authStates';

describe('Pruebas en authSlice', () => {

    test('debe regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);

    });

    test('debe de cambiar el isDateModalOpen correctamente ', () => {



    });
});