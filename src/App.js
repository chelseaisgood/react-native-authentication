import React, { Component } from 'react';
import {
  StyleSheet,
  // Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Card, CardSection, Header, Button, Spinner } from './components/common'; 
import configureStore from './store';
import * as firebaseconfig from './firebaseconfig';

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  
  state = {
    loggedIn: false,
    showSignUpPage: false,
  }
  componentWillMount() {
    const config = {
      apiKey: firebaseconfig.FIREBASE_API_KEY,
      authDomain: firebaseconfig.FIREBASE_AUTH_DOMAIN,
      databaseURL: firebaseconfig.FIREBASE_DATABASE_URL,
      projectId: firebaseconfig.FIREBASE_PROJECT_ID,
      storageBucket: firebaseconfig.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: firebaseconfig.FIREBASE_MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
      <Provider store={store}>
        <View style={styles.container}>
          <Header headerText="authentication" />
          {this.renderContent()}
        </View>
      </Provider>
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
