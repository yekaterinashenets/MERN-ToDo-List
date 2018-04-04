import * as React from 'react';
import { ItemModel } from './../../../models/ItemModel';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

interface Props {
    items: ItemModel[];
    onToggleItem: Function;
    onDeleteItem: Function;
}

const checkDate = (date: Date) => {
    const currentDate = new Date().getTime();
    const expireDate = new Date(date).getTime() + 86400000;
    return currentDate > expireDate;
};

const ToDoList = (props: Props) => {
    const items = props.items.map((item) => (
        <ListItem
            key={item._id} 
            primaryText={item.name} 
            secondaryText={item.description}
            leftCheckbox={
                <Checkbox 
                    disabled={checkDate(item.date)}
                    defaultChecked={item.isDone}
                    onCheck={props.onToggleItem(item._id)}
                />
            } 
            rightIconButton={
                <IconButton onClick={props.onDeleteItem(item._id)}>
                    <Delete/>
                </IconButton>}
        />
    ));
    return (
        <List>
            {items}
        </List>
    );
};

export default ToDoList;