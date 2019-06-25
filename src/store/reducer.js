import {
    combineReducers
} from 'redux';

import loginReducer from '../app/components/LoginComponent/data/reducer';
import snackBarReducer from '../app/common/Snackbar/action';
import LoaderReducer from '../app/common/Loader/action';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    snackBarReducer: snackBarReducer,
    LoaderReducer: LoaderReducer
});

export default rootReducer;