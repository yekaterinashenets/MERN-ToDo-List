import { SAVE_USER } from './../../actions/auth';

const initialState = {
    user: undefined
};

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};