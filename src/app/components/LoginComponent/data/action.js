import {
    LOGIN
} from './constant';

const setArticleDetails = (data) => {
    return {
        type: LOGIN,
        data: data
    }
}

export const getData = () => {
    return {
        type: 'API',
        payload: {
            url: "/users",
            method: "GET",
            data: null,
            onSuccess: setArticleDetails,
            onFailure: () => {
                console.log("Error occurred loading articles");
            }
        }
    };
}