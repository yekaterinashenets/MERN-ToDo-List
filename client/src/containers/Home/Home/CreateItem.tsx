import * as React from 'react';
import './Home.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {
    onCreateItem: any;
    isButtonDisabled: boolean;
    onChangeFor: Function;
    getForm: any;
}

const CreateItem = (props: Props) => {
    return (
        <form className="create-item" ref={props.getForm}>
            <div className="create-item__field">
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    onChange={props.onChangeFor('name')}
                />
            </div>
            <div className="create-item__field">
                <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    onChange={props.onChangeFor('description')}
                />
            </div>
            <div className="create-item__btn">
                <RaisedButton 
                    disabled={props.isButtonDisabled} 
                    label="Create" 
                    primary={true}
                    onClick={props.onCreateItem}
                />
            </div>
        </form>
    );
};

export default CreateItem;