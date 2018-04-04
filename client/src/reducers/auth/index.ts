import { SAVE_USER, CREATE_FAILED, LOGIN_FAILED } from './../../actions/auth';

const initialState = {
    user: undefined,
    loginErrorText: '',
    signupErrorText: ''
};

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                signupErrorText: '',
                loginErrorText: '',
                user: action.user
            };
        case CREATE_FAILED: 
            return {
                ...state,
                signupErrorText: action.errorText
            };
        case LOGIN_FAILED: 
            return {
                ...state,
                loginErrorText: action.errorText
            };
        default:
            return state;
    }
};