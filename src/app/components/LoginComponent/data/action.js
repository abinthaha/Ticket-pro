import {
    LOGIN
} from './constant';

const userLoginComplete = (data) => {
    if (data) {
        return {
            type: LOGIN,
            data: data
        }
    }
}

const userLoginError = (data) => {
    if (data) {
        return {
            type: 'API_ERROR',
            data: data
        }
    }
}

export const userLogin = (data) => {
    return {
        type: 'API',
        payload: {
            url: "/users/login",
            method: "POST",
            data: data,
            onSuccess: userLoginComplete,
            label: true,
            onFailure: userLoginError
        }
    };
}