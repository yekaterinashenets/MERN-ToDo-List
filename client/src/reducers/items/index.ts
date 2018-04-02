import { SAVE_ALL_ITEMS } from './../../actions/items';

const initialState = {
    items: undefined
};

export const items = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_ALL_ITEMS:
            return {
                ...state,
                items: action.items
            };
        default:
            return state;
    }
};