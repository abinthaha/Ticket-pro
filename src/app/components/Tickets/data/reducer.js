import {
    FETCH_TICKET_DETAILS,
    GET_TICKETS
} from './constant';

import { CREATE_TICKET, UPDATE_TICKET, ADMIN_USERS } from '../../CreateTicket/data/constant';

const initialState = {
    ticketDetailsError: null,
    ticketDetails: {}
}

const ticketReducer = (state = initialState, action) => {
    const {
        type,
        data
    } = action;
    switch (type) {
        case ADMIN_USERS:
            return {
                ...state,
                fetchAdminError: null,
                adminUsers: data
            }
        
        case 'FETCH_ADMIN_API_ERROR':
            return {
                ...state,
                fetchAdminError: data
            }

        case GET_TICKETS:
            return {
                ...state,
                ticketDataError: null,
                ticketData: data
            }
        
        case 'GET_TICKETS_API_ERROR':
            return {
                ...state,
                ticketDataError: data
            }

        case FETCH_TICKET_DETAILS:
            return {
                ...state,
                ticketDetailsError: null,
                ticketDetails: data
            }
        
        case 'FETCH_TICKET_API_ERROR':
            return {
                ...state,
                ticketDetailsError: data
            }
        
        case CREATE_TICKET:
            return {
                ...state,
                createTicketError: null,
                createTicketData: data
            }
        
        case 'CREATE_TICKET_API_ERROR':
            return {
                ...state,
                createTicketError: data
            }

        case UPDATE_TICKET:
            return {
                ...state,
                updateTicketError: null,
                updateTicketData: data
            }
        
        case 'UPDATE_TICKET_API_ERROR':
            return {
                ...state,
                updateTicketError: data
            }

        default:
            return {
                ...state
            }
    }
}

export default ticketReducer;