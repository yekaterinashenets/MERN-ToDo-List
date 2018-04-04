import axios from 'axios';
import { UserModel } from './../../models/UserModel';

const apiUrl = ' http://192.168.1.23:3001/auth';

export const LOGIN = '[Auth] Send request for login';
export const login = (name: string, password: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'post',
            url: `${apiUrl}/login`,
            data: {
                name,
                password
            }
        }).then((res) => {
            if (res.data) {
                dispatch(saveUser(res.data));
            }                
        }).catch((err) => {
            dispatch(loginFailed(err.response.data));
            console.log(err);
        });
    };
};

export const SIGNUP = '[Auth] Send request for dignup';
export const signup = (email: string, name: string, password: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'post',
            url: `${apiUrl}/signup`,
            data: {
                name,
                password,
                email
            }
        }).then((res) => {
            if (res.data) {
                dispatch(saveUser(res.data));
            }                
        }).catch((err) => {
            console.log(err);
            dispatch(createFailed(err.response.data));
        });
    };
};

export const SAVE_USER = '[Auth] save user';
export const saveUser = (user: UserModel) => ({
    type: SAVE_USER,
    user
});

export const LOGIN_FAILED = '[Auth] login error';
export const loginFailed = (errorText: string) => ({
    type: LOGIN_FAILED ,
    errorText
});

export const CREATE_FAILED = '[Auth] create error';
export const createFailed = (errorText: string) => ({
    type: CREATE_FAILED,
    errorText
});