import {
        FETCH_TICKET_COMMENTS,
        FETCH_TICKET_DETAILS,
        CREATE_TICKET,
        CREATE_COMMENT,
        UPDATE_TICKET,
        ADMIN_USERS
    } from './constant'

const fetchCommentsComplete = (data) => {
    if (data) {
        return {
            type: FETCH_TICKET_COMMENTS,
            data: data
        }
    }
}

const fetchCommentError = (data) => {
    if (data) {
        return {
            type: 'FETCH_COMMENT_API_ERROR',
            data: data
        }
    }
}

const fetchTicketDetailsComplete = (data) => {
    if (data) {
        return {
            type: FETCH_TICKET_DETAILS,
            data: data
        }
    }
}

const fetchTicketDetailsError = (data) => {
    if (data) {
        return {
            type: 'FETCH_TICKET_API_ERROR',
            data: data
        }
    }
}

const createTicketSuccess = (data) => {
    if (data) {
        return {
            type: CREATE_TICKET,
            data: data
        }
    }
}

const createTicketFailure = (data) => {
    if (data) {
        return {
            type: 'CREATE_TICKET_API_ERROR',
            data: data
        }
    }
}


const createCommentSuccess = (data) => {
    if (data) {
        return {
            type: CREATE_COMMENT,
            data: data
        }
    }
}

const createCommentFailure = (data) => {
    if (data) {
        return {
            type: 'CREATE_COMMENT_API_ERROR',
            data: data
        }
    }
}

const updateTicketSuccess = (data) => {
    if (data) {
        return {
            type: UPDATE_TICKET,
            data: data
        }
    }
}

const updateTicketFailure = (data) => {
    if (data) {
        return {
            type: 'UPDATE_TICKET_API_ERROR',
            data: data
        }
    }
}

const fetchAdminUsersSuccess = (data) => {
    if (data) {
        return {
            type: ADMIN_USERS,
            data: data
        }
    }
}

const fetchAdminUsersFailure = (data) => {
    if (data) {
        return {
            type: 'FETCH_ADMIN_API_ERROR',
            data: data
        }
    }
}

export const fetchComments = (ticketId) => {
    return {
        type: 'API',
        payload: {
            url: "/comments/get_comments?ticket_id=" + ticketId,
            method: "GET",
            data: null,
            accessToken: true,
            onSuccess: fetchCommentsComplete,
            label: true,
            onFailure: fetchCommentError
        }
    };
}

export const fetchTicket = (ticketId) => {
    return {
        type: 'API',
        payload: {
            url: "/tickets/ticket_details?ticket_id=" + ticketId,
            method: "GET",
            data: null,
            accessToken: true,
            onSuccess: fetchTicketDetailsComplete,
            label: true,
            onFailure: fetchTicketDetailsError
        }
    };
}

export const createTicket = data => {
    return {
        type: 'API',
        payload: {
            url: "/tickets/create",
            method: "POST",
            data: data,
            accessToken: true,
            onSuccess: createTicketSuccess,
            label: true,
            onFailure: createTicketFailure
        }
    };
}

export const updateTicket = data => {
    return {
        type: 'API',
        payload: {
            url: "/tickets/ticket_details",
            method: "PUT",
            data: data,
            accessToken: true,
            onSuccess: updateTicketSuccess,
            label: true,
            onFailure: updateTicketFailure
        }
    };
}

export const createComment = (data) => {
    return {
        type: 'API',
        payload: {
            url: "/comments/post_comment",
            method: "POST",
            accessToken: true,
            data: data,
            onSuccess: createCommentSuccess,
            label: true,
            onFailure: createCommentFailure
        }
    };
}

export const fetchAdminUsers = (data) => {
    return {
        type: 'API',
        payload: {
            url: "/users/get",
            method: "GET",
            accessToken: true,
            data: null,
            onSuccess: fetchAdminUsersSuccess,
            label: true,
            onFailure: fetchAdminUsersFailure
        }
    };
}