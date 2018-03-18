import React, { Component } from 'react';
import { Text } from 'react-native';
// import firebase from 'firebase';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as actions from '../actions';

class LoginForm extends Component {

    state = {
        error: '',
    };

    componentWillMount() {
        this.props.cleanUpLoginErrorMessage();
    }

    onLogin = () => {
        const { email, password } = this.props;
        this.props.cleanUpLoginErrorMessage();
        this.setState({ error: '' });
        if (!email && email.length === 0) {
            this.setState({ error: 'Email cannot be none!' });
        } else if (!password && password.length === 0) {
            this.setState({ error: 'Password cannot be none!' });
        } else {
            this.props.loginUser({ email, password });
        }
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
                <Text style={styles.errorTextStyle}>
                    {this.props.loginError}
                </Text>
                <CardSection>
                    {this.props.loginProcessing
                        ?
                        <Spinner />
                        :
                        <Button onPress={this.onLogin}>
                            Log in
                        </Button>
                    }
                </CardSection>
                <CardSection>
                    {!this.props.loginProcessing &&
                        <Button onPress={this.props.goToSignUpPage}>
                            Sign up
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
        password: state.auth.password,
        loginError: state.auth.loginError,
        loginProcessing: state.auth.loginProcessing
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
