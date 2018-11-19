import {combineReducers} from 'redux';

import surveyBuilderReducers from "./surveyBuilderReducers";
import accountReducers from "./accountReducers";
import userReducers from "./userReducers";
import appReducers from "./appReducers"

const appReducer = combineReducers({
    surveyBuilder: surveyBuilderReducers,
    account: accountReducers,
    user: userReducers,
    app: appReducers
});

export default appReducer;