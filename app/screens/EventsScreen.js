import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Config,
  Image,
  Button,
  TouchableHighlight,
  ScrollView,
  View,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/layout.js';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import AppView from '../components/AppView';
import { API_BASE_URL } from '../utils/constants';

class EventsScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      visible: true,
      dataSource: ds.cloneWithRows([]),
    };
  }

  _showContacts() {
    // console.log("account_id" + this.props.account_id);
    Actions.contacts({ account_id: this.props.account_id });
  }

  _pressRow(rowID) {
    Actions.event({ account_id: this.props.account_id, event_id: rowID });
  }

  componentDidMount() {
    this.props.set_account_id(this.props.account_id);

    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/accounts/${this.props.account_id}/events.json`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + data,
            },
          }
        )
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseData)
            this.setState({
              visible: false,
              dataSource: this.state.dataSource.cloneWithRows(responseData),
            });
          })
          .catch(error => {
            this.setState({ visible: false });
            Alert.alert('Login Failed',error.toString());
            console.warn(error);
          });
      }
    });
  }

  render() {
    return (
      <AppView>
        <Spinner visible={this.state.visible} />
        <View>

          <TouchableHighlight
            style={styles.contacts_button}
            onPress={() => {
              this._showContacts();
            }}
            underlayColor="#99d9f4"
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 13,
              }}
            >
              <View style={{ flex: 5, flexDirection: 'row' }}>
                <Image
                  style={{ width: 20, height: 20, marginRight: 20 }}
                  source={require('../img/icon-users.png')}
                />
                <Text style={styles.buttonText}>Contacts</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image
                  style={{ width: 11, height: 20 }}
                  source={require('../img/icon-arrow.png')}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>

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
              EVENTS
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
                      <Text style={styles.cellLocation}>
                        {rowData.location.name}
                      </Text>
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

export default EventsScreen;
