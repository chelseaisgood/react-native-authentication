import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Card, CardSection, Button, Spinner } from './common'; 
import { startFirebaseEmployeeUpdateListener } from '../actions/EmployeeActions'; 

class AuthSharedComponent extends Component {
  
  state = {
    loggedIn: false,
    showSignUpPage: false,
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.startFirebaseEmployeeUpdateListener();
        Actions.main();
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onUserLogout = () => {
    firebase.auth().signOut();
  }

  goToSignUpPage = () => {
    this.setState({ showSignUpPage: true });
  }

  goToLogInPage = () => {
    this.setState({ showSignUpPage: false });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={this.onUserLogout} style={styles.logoutButtonStyle}>
                Log out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        if (this.state.showSignUpPage) {
          return <SignupForm goToLogInPage={this.goToLogInPage} />;
        }
        return <LoginForm goToSignUpPage={this.goToSignUpPage} />;
      default:
        return <Spinner />;
      }
  }

  render() {
    return (
        <View style={styles.container}>
          {/* <Header headerText="authentication" /> */}
          {this.renderContent()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  logoutButtonStyle: {
    height: 30,
    flex: 1,
    width: null,
  }
});

export default connect(null, { startFirebaseEmployeeUpdateListener })(AuthSharedComponent);
