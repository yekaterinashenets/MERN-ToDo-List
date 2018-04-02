import axios from 'axios';
import { UserModel } from './../../models/UserModel';

const apiUrl = ' http://192.168.0.105:3001/auth';

export const LOGIN = '[Auth] Send request for login';
export const login = (name: string, password: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'post',
            url: apiUrl,
            data: {
                name,
                password
            }
        }).then((res) => {
            if (res.data) {
                dispatch(saveUser(res.data));
            }                
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const SAVE_USER = '[Auth] save user';
export const saveUser = (user: UserModel) => ({
    type: SAVE_USER,
    user
});