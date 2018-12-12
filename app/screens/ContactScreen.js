import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  ListView,
  Config,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
} from 'react-native';

import GridView from 'react-native-gridview';
import Spinner from 'react-native-loading-spinner-overlay';
import layout from '../styles/layout.js';
import store from 'react-native-simple-store';

import { Actions } from 'react-native-router-flux';
import AppView from '../components/AppView';
import { API_BASE_URL } from '../utils/constants';

class ContactScreen extends Component {
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
    Actions.editcontact({
      account_id: this.props.account_id,
      event_id: this.props.event_id,
      contact_id: rowID,
    });
  }

  componentWillReceiveProps() {
    this.setState({ visible: true });
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/contacts/${this.props.contact_id}.json`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + data,
            },
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              visible: false,
              id: responseData['id'],
              name: responseData['name'],
              email: responseData['email'],
              tags: responseData['tags'].join(', '),
              dataSource: this.state.dataSource.cloneWithRows(
                responseData['tags']
              ),
            });
          })
          .catch(error => {
            this.setState({visible:false});
            Alert.alert('Error', error.toString())
            console.warn(error);
          });
      }
    });
  }

  componentDidMount() {
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/contacts/${this.props.contact_id}.json`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + data,
            },
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              visible: false,
              id: responseData['id'],
              name: responseData['name'],
              email: responseData['email'],
              tags: responseData['tags'].join(', '),
              dataSource: this.state.dataSource.cloneWithRows(
                responseData['tags']
              ),
            });
          })
          .catch(error => {
            this.setState({visible:false});
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
        <ScrollView scrollEnabled={false}>
          <Text style={layout.label_style}>Name</Text>
          <Text style={layout.text_style}>{this.state.name}</Text>
          <Text style={layout.label_style}>Email</Text>
          <Text style={layout.text_style}>{this.state.email}</Text>
          <Text style={layout.label_style}>Tags</Text>

          <ListView
            scrollEnabled={false}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View
                style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}
              >
                <View
                  style={{
                    borderColor: '#29695F',
                    borderWidth: 1,
                    borderRadius: 5,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      padding: 5,
                      fontSize: 18,
                      color: '#FFFFFF',
                      backgroundColor: '#29695F',
                    }}
                  >
                    {rowData}
                  </Text>
                </View>
              </View>
            )}
          />

          <TouchableHighlight
            style={{
              backgroundColor: '#C7E3E0',
              borderColor: '#C7E3E0',
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: 'center',
              padding: 10,
              margin: 20,
            }}
            onPress={() => {
              this._pressRow(this.state.id);
            }}
          >
            <Text style={layout.buttonText}>Edit</Text>
          </TouchableHighlight>

        </ScrollView>
      </AppView>
    );
  }
}

export default ContactScreen;

//name, email, tags
