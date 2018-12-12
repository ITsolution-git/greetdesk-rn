import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
} = ReactNative;

import AttendeesTable from '../components/AttendeesTable.js';

export default class AttendeesScreen extends Component {
  render() {
    return <AttendeesTable />;
  }
}
