import {
    LOGIN
} from './constant';

const defaultState = {
    loginData: [],
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
                loginData: data
            }

        default:
            return state;
    }
};

export default loginReducer;