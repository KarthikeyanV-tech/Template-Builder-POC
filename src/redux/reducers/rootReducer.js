import {combineReducers} from 'redux';
import homeReducer from '../reducers/homeReducer';
import navigatorReducer from '../reducers/navigatorReducer';
import contentReducer from '../reducers/contentReducer';

const rootReducer = combineReducers({
    homeReducer,
    navigatorReducer,
    contentReducer
});

export default rootReducer;