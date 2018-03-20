import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase'; 
import configureStore from './store';
import * as firebaseconfig from './firebaseconfig';
import Router from './Router';

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  
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
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
