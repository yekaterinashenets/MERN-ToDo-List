import * as React from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getItems, toggleItem, deleteItem, createItem } from '../../../actions/items';
import { ItemModel } from './../../../models/ItemModel';
import ToDoList from './ToDoList';
import CreateItem from './CreateItem';
import { UserModel } from '../../../models/UserModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface State {
    name?: string;
    description?: string;
}

interface Props {
    getItems: any;
    toggleItem: any;
    deleteItem: any;
    items: ItemModel[] | undefined;
    createItem: any;
    user: UserModel | undefined;
}

class Home extends React.Component<Props & RouteComponentProps<any>, State> {
    state: State = {
        name: '',
        description: ''
    };
    form: any = undefined;

    componentDidMount() {
        this.props.user ? this.props.getItems(this.props.user._id) : this.props.history.push('');
    }

    onToggleItem = (id: string) => {
        return (event: any, isInputChecked: boolean) => {
            this.props.toggleItem(id, isInputChecked);
        };
    }

    onDeleteItem = (id: string) => {
        return (event: any) => {
            this.props.user && this.props.deleteItem(this.props.user._id, id);
        };
    }

    onChangeFor = (key: string) => {
        return (event: any) => {
            this.setState({
                ...this.state,
                [key] : event.target.value || undefined
            });
        };
    }

    isButtonDisabled = () => !!this.state.name;

    onCreateItem = (event: React.SyntheticEvent<any>) => {
        this.props.user && this.props.createItem(this.props.user._id, this.state.name, this.state.description);
        this.setState({
            name: '',
            description: ''
        });
        this.form.reset();
    }

    getForm = (ref: HTMLFormElement | null) => this.form = ref;

    render() {
        let { items } = this.props;
        return (
            <div className="home">
                <div className="home__create">
                        <CreateItem
                            isButtonDisabled={!this.isButtonDisabled()}
                            onChangeFor={this.onChangeFor}
                            onCreateItem={this.onCreateItem}
                            getForm={this.getForm}
                        />
                </div>
                <div className="home__list">
                        <ToDoList 
                            items={items || []} 
                            onToggleItem={this.onToggleItem}
                            onDeleteItem={this.onDeleteItem}
                        />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return{
        items: state.items.items,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    getItems: (userId: string) => dispatch(getItems(userId)),
    toggleItem: (id: string, isDone: boolean) => dispatch(toggleItem(id, isDone)),
    deleteItem: (userId: string, id: string) => dispatch(deleteItem(userId, id)),
    createItem: (userId: string, name: string, description: string) => dispatch(createItem(userId, name, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));