import axios from 'axios';
import { ItemModel } from '../../models/ItemModel';

const apiUrl = ' http://192.168.0.105:3001/items';

export const GET_ALL_ITEMS = '[Items] Send request for get items';
export const getItems = (userId: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'get',
            url: `${apiUrl}/${userId}`
        }).then((res) => {
            if (res.data) {
                dispatch(saveItems(res.data));
            }
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const CREATE_ITEM = '[Items] Create item';
export const createItem = (userId: string, name: string, description: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'post',
            url: apiUrl,
            data: {
                userId,
                name,
                description
            }
        }).then((res) => {
            dispatch(getItems(userId));
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const TOGGLE_ITEM = '[Items] Toggle item state';
export const toggleItem = (id: string, isDone: boolean) => {
    return (dispatch: Function) => {
        axios({
            method: 'put',
            url: `${apiUrl}/${id}`,
            data: {
                isDone: isDone
            }
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const DELETE_ITEM = '[Items] Delete item';
export const deleteItem = (userId: string, id: string) => {
    return (dispatch: Function) => {
        axios({
            method: 'delete',
            url: `${apiUrl}/${id}`
        }).then((res) => {
            dispatch(getItems(userId));
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const SAVE_ALL_ITEMS = '[Items] save items';
export const saveItems = (items: ItemModel[]) => ({
    type: SAVE_ALL_ITEMS,
    items
});