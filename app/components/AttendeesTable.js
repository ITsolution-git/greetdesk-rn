import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

import AttendeeRow from './AttendeeRow.js';
import data from './data.js';
import AttendeesHeader from './AttendeesHeader.js';
import AttendeesFooter from './AttendeesFooter.js';

class AttendeesTable extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    try {
      //AsyncStorage.setItem('slawko', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }

    try {
      //  const value = AsyncStorage.getItem('slawko');
      if (value !== null) {
        // We have data!!
        //  console.warn('we have data')
        //console.warn(value);
      }
    } catch (error) {
      // Error retrieving data
    }

    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }
  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderSeparator={(sectionId, rowId) => (
          <View key={rowId} style={styles.separator} />
        )}
        renderRow={data => <AttendeeRow {...data} />}
        renderHeader={() => <AttendeesHeader />}
        renderFooter={() => <AttendeesFooter />}
      />
    );
  }
}

export default AttendeesTable;
