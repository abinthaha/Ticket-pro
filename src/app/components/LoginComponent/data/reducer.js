import {
    LOGIN,
    SIGN_UP,
    LOGOUT
} from './constant';

const defaultState = {
    loginData: {},
    loginError: null
};

const loginReducer = (state = defaultState, action) => {

    const {
        type,
        data
    } = action;

    switch (type) {
        case LOGIN:
            return {
                ...state,
                loginError: null,
                loginData: data
            }
        case SIGN_UP:
            return {
                ...state,
                signUpError: null,
                signUpData: data
            }
        case LOGOUT:
            return {
                ...state,
                loginError: null,
                loginData: {}
            }

        case 'API_ERROR':
            return {
                ...state,
                loginError: data
            }
            
        case 'SIGN_UP_ERROR':
            return {
                ...state,
                signUpError: data
            }
        default:
            return state;
    }
};

export default loginReducer;