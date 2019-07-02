import {
    combineReducers
} from 'redux';

import loginReducer from '../app/components/LoginComponent/data/reducer';
import snackBarReducer from '../app/common/Snackbar/action';
import loaderReducer from '../app/common/Loader/action';
import ticketReducer from '../app/components/Tickets/data/reducer';
import userReducer from '../app/common/Header/action';
import commentsReducer from '../app/components/CreateTicket/data/reducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    snackBarReducer: snackBarReducer,
    loaderReducer: loaderReducer,
    ticketReducer: ticketReducer,
    userReducer: userReducer,
    commentsReducer: commentsReducer
});

export default rootReducer;