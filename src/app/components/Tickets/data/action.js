import { SET_USER_DATA } from './constant';

export const setUserData = (data) => {
    return {
        type: SET_USER_DATA,
        data: data
    }
}