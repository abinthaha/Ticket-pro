import axios from "axios";

import {
    accessDenied,
    apiError,
    apiStart,
    apiEnd,
    API
} from "./api";


const BASE_URL = 'http://localhost:3000';

const apiMiddleware = ({
    dispatch
}) => next => action => {
    next(action);

    if (!action || action.type !== API) return;

    const {
        url,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headers
    } = action.payload;

    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";


    // axios default configs

    let userToken = accessToken ? localStorage.getItem('token') : '';
    userToken = userToken.split(' ')[1];

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `${userToken}`;


    if (label) {
        dispatch(apiStart(label));
    }
    axios
        .request({
            url: `${BASE_URL}${url}`,
            method,
            headers,
            [dataOrParams]: data
        })
        .then(({
            data
        }) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(apiError(error.response));
            dispatch(onFailure(error.response));

            if (error.response && error.response.status === 403) {
                dispatch(accessDenied(window.location.pathname));
            }
        })
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label));
            }
        });
};

export default apiMiddleware;