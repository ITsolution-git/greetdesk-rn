import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Alert,
  Config,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/layout.js';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import AppView from '../components/AppView';
import { API_BASE_URL } from '../utils/constants';

class AccountsScreen extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      visible: true,
      dataSource: ds.cloneWithRows([]),
    };
  }

  _pressRow(rowID) {
    Actions.events({ account_id: rowID });
  }

  renderRightButton = () => {
    return (
      <TouchableOpacity onPress={this.onLogout}>
        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Logout</Text>
      </TouchableOpacity>
    );
  };

  onLogout() {
    store
      .save('profile_data', null)
      .then(() => Actions.login({ type: 'reset' }));
  }

  componentDidMount() {
    Actions.refresh({
      renderLeftButton: this.renderLeftButton,
      renderRightButton: this.renderRightButton,
    });
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(`${API_BASE_URL}/accounts.json`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + data,
          },
        })
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              visible: false,
              dataSource: this.state.dataSource.cloneWithRows(responseData),
            });
          })
          .catch(error => {
            this.setState({
              visible: false,
            });
            Alert.alert(
              'Could not get accounts',
              error.toString()
            );
          });
      }
    });
  }

  render() {
    return (
      <AppView>
        <Spinner visible={this.state.visible} />
        <ScrollView style={[styles.listview_container, { paddingBottom: 20 }]}>
          <View>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 15,
                color: '#333333',
                fontSize: 18,
                fontWeight: 'normal',
              }}
            >
              ACCOUNTS
            </Text>
            <View
              style={{
                alignSelf: 'stretch',
                height: 1,
                backgroundColor: '#A7AEB9',
                marginTop: 10,
                marginLeft: 2,
                marginRight: 2,
              }}
            />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={rowData => (
                <TouchableHighlight
                  onPress={() => {
                    this._pressRow(rowData.id);
                  }}
                >
                  <View style={styles.cellContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{ alignSelf: 'auto' }}
                        source={require('../img/mitingu.png')}
                      />
                    </View>
                    <View style={{ flex: 5 }}>
                      <Text style={styles.cellTitle}>{rowData.name}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        </ScrollView>
      </AppView>
    );
  }
}

export default AccountsScreen;
