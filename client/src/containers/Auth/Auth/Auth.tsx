import * as React from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../../../actions/auth';
import { UserModel } from './../../../models/UserModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface State {
    name?: string;
    password?: string;
}

interface Props {
    login: any;
    user: UserModel | undefined;
}

class Auth extends React.Component<Props & RouteComponentProps<any>, State> {
    state: State = {
        name: '',
        password: ''
    };

    componentWillReceiveProps(newProps: Props) {
        if (newProps.user) {
            this.props.history.push('/list');
        }
    }

    onChangeFor = (key: string) => {
        return (event: any) => {
            this.setState({
                ...this.state,
                [key]: event.target.value || undefined
            });
        };
    }

    login = (e: React.MouseEvent<any>) => {
        this.props.login(this.state.name, this.state.password);
    }

    isButtonDisabled = () => !this.state.name || !this.state.password;

    render() {
        return (
            <div className="auth">
                <form className="auth__form">
                    <div className="auth__field">
                        <TextField
                            hintText="Name"
                            floatingLabelText="Name"
                            onChange={this.onChangeFor('name')}
                        />
                    </div>
                    <div className="auth__field">
                        <TextField
                            hintText="Password"
                            type="password"
                            floatingLabelText="Password"
                            onChange={this.onChangeFor('password')}
                        />
                    </div>
                    <div className="auth__btn">
                        <RaisedButton
                            disabled={this.isButtonDisabled()}
                            label="login"
                            primary={true}
                            onClick={this.login}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    login: (name: string, password: string) => dispatch(login(name, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));