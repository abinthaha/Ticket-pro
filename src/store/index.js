import {
    compose,
    createStore,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk';
import apiMiddleware from "../api/index";

// Logger with default options
import logger from "redux-logger";
import rootReducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk, logger, apiMiddleware)),
);

export default store;