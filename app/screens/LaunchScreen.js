import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Config,
  TouchableHighlight,
  View,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/layout.js';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

class LaunchScreen extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    this.setState({ visible: false });
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        Actions.login({ type: 'reset' });
      } else {
        Actions.accounts({ type: 'reset' });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} />
      </View>
    );
  }
}

export default LaunchScreen;
