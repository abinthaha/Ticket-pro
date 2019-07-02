import { GET_TICKETS } from './constant';

const getTicketsSuccess = (data) => {
    if (data) {
        return {
            type: GET_TICKETS,
            data: data
        }
    }
}

const getTicketsFailure = (data) => {
    if (data) {
        return {
            type: 'GET_TICKETS_API_ERROR',
            data: data
        }
    }
}

export const getTickets = () => {
    return {
        type: 'API',
        payload: {
            url: "/tickets/get",
            method: "GET",
            accessToken: true,
            data: null,
            onSuccess: getTicketsSuccess,
            label: true,
            onFailure: getTicketsFailure
        }
    };
}