import AuthReducers from './user';
import HomeReducers from './home';
import {combineReducers} from 'redux';

export default combineReducers({
    AuthReducers,
    HomeReducers
});