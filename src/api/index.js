import axios from "axios";

import {
    accessDenied,
    apiError,
    apiStart,
    apiEnd,
    API
} from "./api";


const BASE_URL = 'http://localhost:5000/api';

const apiMiddleware = ({
    dispatch
}) => next => action => {
    next(action);

    if (action.type !== API) return;

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

    const userToken = accessToken ? localStorage.getItem('token') : '';

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer${userToken}`;


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
            dispatch(apiError(error));
            dispatch(onFailure(error));

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