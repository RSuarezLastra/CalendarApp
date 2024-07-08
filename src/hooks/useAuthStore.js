import { useDispatch, useSelector } from "react-redux"
import { calendatApi } from "../api/calendarApi";
import { clearError, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const dispatch = useDispatch();

    const { status, user, errorMessage } = useSelector(state => state.auth);

    //* startLogin

    const startLogin = async ({ email, password }) => {
        try {
            const { data } = await calendatApi.post('/auth', { email, password });
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

    const startRegister =  async({name, email, password}) => {
        try {
            const { data } = await calendatApi.post('/auth/register', { name,email, password });
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msj))
            setTimeout(() => {
                dispatch(clearError())
            }, 10);
        }
    }


    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
    }

}