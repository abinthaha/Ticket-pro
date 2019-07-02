import {
    FETCH_TICKET_COMMENTS,
    CREATE_COMMENT
} from './constant';

const defaultState = {
    commentsData: [],
    ticketDetails: {},
    commentsError: null
};

const commentsReducer = (state = defaultState, action) => {

    const {
        type,
        data
    } = action;

    switch (type) {
        case FETCH_TICKET_COMMENTS:
            return {
                ...state,
                commentsError: null,
                    commentsData: data
            }
            
        case 'FETCH_COMMENT_API_ERROR':
            return {
                ...state,
                commentsError: data
            }
        
        case CREATE_COMMENT:
            return {
                ...state,
                commentsError: null,
                createCommentData: data
            }
            
        case 'CREATE_COMMENT_API_ERROR':
            return {
                ...state,
                commentsError: data
            }
            
        default:
            return state;
    }
};

export default commentsReducer;