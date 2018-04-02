import { combineReducers } from 'redux';
import { items } from './items';
import { auth } from './auth';

const appReducers = combineReducers({
    items,
    auth
});

const reducers = (state: any, action: any) => {
    return appReducers(state, action);
};

export default reducers;