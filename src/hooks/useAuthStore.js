import { useDispatch, useSelector } from "react-redux"
import { calendatApi } from "../api/calendarApi";


export const useAuthStore = () => {

    const dispatch = useDispatch();

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async ({ email, password }) => {
        try {
            const resp = await calendatApi.post('/auth', { email, password });

            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }


    return {
        status,
        user,
        errorMessage,

        startLogin
    }

}