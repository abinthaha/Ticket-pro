// import { SET_USER_DATA } from './constant';

export const setUserData = (data) => {
    return {
        type: 'SET_USER_DATA',
        data: data
    }
}
const initialState = {

}

const userReducer = (state = initialState, action) => {
    const {
        type,
        data
    } = action;

    switch (type) {
        case 'SET_USER_DATA':
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

export default userReducer;