import {
    SET_USER_DATA
} from './constant';

const initialState = {

}

const ticketReducer = (state = initialState, action) => {
    const {
        type,
        data
    } = action;

    switch (type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: data
            }

            default:
                return {
                    ...state
                }
    }
}

export default ticketReducer;