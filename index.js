import { AppRegistry } from 'react-native';
// import store from "./store";
import App from './src/App';

AppRegistry.registerComponent('manager', () => App);

// import React from 'react';
// import configureStore from './src/store';
// import App from './src/App';

// const store = configureStore();
// AppRegistry.registerComponent('manager', () => <App store={store} />);
// export default class RNBase extends React.Component {
//   render() {
//     return <App {...this.props} store={store} />;
//   }
// }
