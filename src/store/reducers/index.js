import {combineReducers} from 'redux';
import surveyBuilderReducers from "./surveyBuilderReducers";

const appReducer = combineReducers({
    surveyBuilder: surveyBuilderReducers
});

export default appReducer;