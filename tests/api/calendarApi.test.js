import { calendarApi } from "../../src/api/calendarApi";

describe('Pruebas en calendarApi', () => {

    test('debe de tener la configuracion por defecto', () => {

        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('debe de tener le x-token en el header de las peticiones', async () => {

        const token = 'FEF-223-ABC';
        localStorage.setItem('token', token);

        const res = await calendarApi.get('/auth')
            .then(res => res)
            .catch(res => res);

        expect(res.config.headers['x-token']).toBe(token);

    });
});