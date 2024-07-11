import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api/calendarApi";
import { clearError, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

    const dispatch = useDispatch();

    const { status, user, errorMessage } = useSelector(state => state.auth);

    //* startLogin

    const startLogin = async ({ email, password }) => {
        try {
            const { data } = await calendarApi.post('/auth', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));

            setTimeout(() => {
                dispatch(clearError())
            }, 10);
        }
    }

    //* startRegister

    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg));

            setTimeout(() => {
                dispatch(clearError())
            }, 10);
        }
    }
    //* checkAuthToken

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout());
    }


    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }

}