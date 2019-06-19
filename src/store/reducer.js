import {
    combineReducers
} from 'redux';

import loginReducer from '../app/components/LoginComponent/data/reducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer
});

export default rootReducer;