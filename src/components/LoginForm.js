import React, { Component } from 'react';
import { Text } from 'react-native';
// import firebase from 'firebase';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as actions from '../actions';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    // onLogin() {
    //     const { email, password } = this.props;
    //     // console.log('email');
    //     // this.props.loginUser({ email, password });
    //     this.setState({ error: '', loading: true });
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(
    //         () => {
    //             console.log('success!!!!!');
    //             this.onLoginSuccess();
    //         }
    //     )
    //     .catch(
    //         (err) => {
    //             console.log(err);
    //             this.onLoginFail();
    //         }
    //     );
    // }

    onLogin() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
        // this.setState({ error: '', loading: true });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        // .then(
        //     () => {
        //         console.log('success!!!!!');
        //         this.onLoginSuccess();
        //     }
        // )
        // .catch(
        //     () => {
        //         this.onLoginFail();
        //     }
        // );
    }

    onLoginFail = () => {
        this.setState({
            error: 'Login failed.',
            loading: false,
        });
    }

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });
    }

    onEmailChange = text => {
        this.props.emailChange(text);
    }

    onPasswordChange = password => {
        this.props.passwordChange(password);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="email"
                        placeholder="user@gmail.com"
                        value={this.props.email}
                        onChangeText={this.onEmailChange}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="password"
                        placeholder="password"
                        value={this.props.password}
                        onChangeText={this.onPasswordChange}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.state.loading
                        ?
                        <Spinner />
                        :
                        <Button onPress={this.onLogin.bind(this)}>
                            Log in
                        </Button>
                    }
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return ({
        email: state.auth.email,
        password: state.auth.password
    });
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};


export default connect(mapStateToProps, actions)(LoginForm);
