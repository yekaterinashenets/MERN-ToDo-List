import * as React from 'react';
import * as styles from './Auth.css';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { login, signup } from '../../../actions/auth';
import { UserModel } from './../../../models/UserModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Form from './Form';

interface State {
    login: {
        name?: string;
        password?: string;
    };
    signup: {
        name?: string;
        email?: string;
        password?: string;
    };    
}

interface Props {
    login: any;
    signup: any;
    user: UserModel | undefined;
    signupErrorText: string;
    loginErrorText: string;
}

class Auth extends React.Component<Props & RouteComponentProps<any>, State> {
    state: State = {
        login: {
            name: '',
            password: ''
        },
        signup: {
            name: '',
            email: '',
            password: ''
        }
    };

    componentWillReceiveProps(newProps: Props) {
        if (newProps.user) {
            this.props.history.push('/list');
        }
    }

    onChangeFor = (form: string, key: string) => {
        return (event: any) => {
            this.setState({
                ...this.state,
                [form]: {
                    ...this.state[form],
                    [key]: event.target.value || undefined
                }
            });
        };
    }

    login = (e: React.MouseEvent<any>) => {
        this.props.login(this.state.login.name, this.state.login.password);
    }

    signup = (e: React.MouseEvent<any>) => {
        this.props.signup(this.state.signup.email, this.state.signup.name, this.state.signup.password);
    }

    isLoginButtonDisabled = () => !this.state.login.name || !this.state.login.password;

    isSignupButtonDisabled = () => !this.state.signup.name || !this.state.signup.password || !this.state.signup.email;

    render() {
        return (
            <div className={styles.container}>
                <div>
                    <Form 
                        fields={[
                            <TextField
                                key={1}
                                hintText="Name"
                                floatingLabelText="Name"
                                onChange={this.onChangeFor('login', 'name')}
                            />,
                            <TextField
                                key={2}
                                hintText="Password"
                                type="password"
                                floatingLabelText="Password"
                                onChange={this.onChangeFor('login', 'password')}
                            />
                        ]}
                        button={
                            <RaisedButton
                                disabled={this.isLoginButtonDisabled()}
                                label="login"
                                primary={true}
                                onClick={this.login}
                            />
                        }
                    />
                     <p className={styles.error}>{this.props.loginErrorText}</p>
                </div>
                <div>
                    <Form 
                        fields={[
                            <TextField
                                key={6}
                                hintText="Email"
                                floatingLabelText="Email"
                                onChange={this.onChangeFor('signup', 'email')}
                            />,
                            <TextField
                                key={5}
                                hintText="Name"
                                floatingLabelText="Name"
                                onChange={this.onChangeFor('signup', 'name')}
                            />,
                            <TextField
                                key={7}
                                hintText="Password"
                                type="password"
                                floatingLabelText="Password"
                                onChange={this.onChangeFor('signup', 'password')}
                            />
                        ]}
                        button={
                            <RaisedButton
                                disabled={this.isSignupButtonDisabled()}
                                label="signup"
                                primary={true}
                                onClick={this.signup}
                            />
                        }
                    />
                    <p className={styles.error}>{this.props.signupErrorText}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        signupErrorText: state.auth.signupErrorText,
        loginErrorText: state.auth.loginErrorText
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    login: (name: string, password: string) => dispatch(login(name, password)),
    signup: (email: string, name: string, password: string) => dispatch(signup(email, name, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));