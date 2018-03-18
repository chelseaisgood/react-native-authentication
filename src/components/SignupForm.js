import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as actions from '../actions';

class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    };

    componentWillMount() {
        this.props.cleanUpSignupErrorMessage();
    }

    onSignUp = () => {
        const { email, password, confirmPassword } = this.state;
        this.props.cleanUpSignupErrorMessage();
        this.setState({ error: '' });
        if (!email && email.length === 0) {
            this.setState({ error: 'Email cannot be none!' });
        } else if (!password && password.length === 0) {
            this.setState({ error: 'Password cannot be none!' });
        } else if (confirmPassword !== password) {
            this.setState({ error: 'Two Passwords are not consistent!' });
        } else {
            this.props.signupUser({ email, password });
        }
    }

    onEmailChange = text => this.setState({ email: text });

    onPasswordChange = password => this.setState({ password });

    onConfirmPasswordChange = confirmPassword => this.setState({ confirmPassword });

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={this.onPasswordChange}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="confirm password"
                        value={this.state.confirmPassword}
                        onChangeText={this.onConfirmPasswordChange}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.props.signupError}
                </Text>
                <CardSection>
                    {!this.state.loading &&
                        <Button onPress={this.onSignUp}>
                            Sign up Now
                        </Button>
                    }
                </CardSection>
                <CardSection>
                    {this.props.signupProcessing
                        ?
                        <Spinner />
                        :
                        <View style={styles.signInButtonAndTextContainerStyle}>
                            <View style={styles.marginStyle} />
                            <View style={styles.signInTextStyle}>
                                <Text> Already have an account? </Text>
                            </View>
                            <View style={styles.signInButtonContainerStyle}>
                                <Button
                                    style={styles.signInButtonStyle}
                                    onPress={this.props.goToLogInPage}
                                >
                                    Log in
                                </Button>
                            </View>
                            <View style={styles.marginStyle} />
                        </View>
                    }
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return ({
        signupError: state.auth.signupError,
        signupProcessing: state.auth.signupProcessing
    });
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    signInButtonAndTextContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
    },
    marginStyle: {
        flex: 0.2,
    },
    signInTextStyle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    signInButtonContainerStyle: {
        flex: 1,
        alignItems: 'flex-start',
    },
    signInButtonStyle: {
        // flex: 0.7,
    }
};


export default connect(mapStateToProps, actions)(SignupForm);
