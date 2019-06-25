import {
    LOGIN
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

        case 'API_ERROR':
            return {
                ...state,
                loginError: data
            }
        default:
            return state;
    }
};

export default loginReducer;