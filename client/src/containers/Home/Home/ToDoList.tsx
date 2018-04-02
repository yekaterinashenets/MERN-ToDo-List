import * as React from 'react';
import './Home.css';
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

const ToDoList = (props: Props) => {
    const items = props.items.map((item) => (
        <ListItem
            key={item._id} 
            primaryText={item.name} 
            secondaryText={item.description}
            leftCheckbox={
                <Checkbox 
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