import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Config,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/layout.js';
import store from 'react-native-simple-store';

import { Actions } from 'react-native-router-flux';
import { API_BASE_URL } from '../utils/constants';

class GuestScreen extends Component {
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
    Actions.editguest({
      account_id: this.props.account_id,
      event_id: this.props.event_id,
      contact_id: rowID,
    });
  }

  _changeStatus(rowID) {
    var action = this.state.status == 'in' ? 'out' : 'in';
    this.setState({ visible: true });
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/lists/${this.props.list_id}/contacts/${rowID}/${action}.json`,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + data,
            },
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.props.increment_account_list();
            this.setState({
              visible: false,
              status: responseData['status'],
              status_name: responseData['status'] == 'in'
                ? 'Checkout'
                : 'Checkin',
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
  componentWillReceiveProps() {
    this.setState({ visible: true });
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/lists/${this.props.list_id}/contacts/${this.props.contact_id}.json`,
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
              status: responseData['status'],
              status_name: responseData['status'] == 'in'
                ? 'Checkout'
                : 'Checkin',
              id: responseData['id'],
              name: responseData['name'],
              contact_id: responseData['contact_id'],
              email: responseData['email'],
              tags: responseData['tags'].join(', '),
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

  componentDidMount() {
    console.log('list id : ' + this.props.list_id);
    console.log('contact id : ' + this.props.contact_id);
    store.get('profile_data').then(data => {
      if (data === null || data === undefined) {
        // redirect to home page
      } else {
        fetch(
          `${API_BASE_URL}/lists/${this.props.list_id}/contacts/${this.props.contact_id}.json`,
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
              status: responseData['status'],
              status_name: responseData['status'] == 'in'
                ? 'Checkout'
                : 'Checkin',
              name: responseData['name'],
              contact_id: responseData['contact_id'],
              email: responseData['email'],
              tags: responseData['tags'].join(', '),
            });
          })
          .catch(error => {
            //this.setState({visible:false})
            console.warn(error);
          });
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} />

        <View
          style={{
            backgroundColor: '#C7E3E0',
            padding: 20,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#333333',
              fontSize: 20,
              justifyContent: 'center',
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            {this.state.name}
          </Text>
          <TouchableHighlight
            style={{
              marginTop: 50,
              padding: 10,
              backgroundColor: '#43a2bf',
              borderColor: '#3b93ad',
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
              justifyContent: 'center',
            }}
            onPress={() => {
              this._changeStatus(this.state.contact_id);
            }}
            underlayColor="#99d9f4"
          >
            <Text style={{ fontSize: 18, color: 'white', alignSelf: 'center' }}>
              {this.state.status_name == 'Checkin' ? 'CHECK IN' : 'CHECK OUT'}
            </Text>
          </TouchableHighlight>
        </View>

        <View>
          <Text style={styles.label_style}>Name</Text>
          <Text style={styles.text_style}>{this.state.name}</Text>
          <Text style={styles.label_style}>Email</Text>
          <Text style={styles.text_style}>{this.state.email}</Text>
          <Text style={styles.label_style}>Tags</Text>
          <Text style={styles.text_style}>{this.state.tags}</Text>
        </View>

        <TouchableHighlight
          style={{
            backgroundColor: '#C7E3E0',
            borderColor: '#C7E3E0',
            borderWidth: 1,
            borderRadius: 8,
            alignSelf: 'stretch',
            justifyContent: 'center',
            padding: 10,
            margin: 20,
          }}
          onPress={() => {
            this._pressRow(this.state.contact_id);
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>

        <View
          style={{
            position: 'absolute',
            bottom: 40,
            left: 100,
            right: 100,
            alignItems: 'center',
          }}
        />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: 140, height: 30, justifyContent: 'center' }}
            source={require('../img/logo-footer.png')}
          />
        </View>
      </ScrollView>
    );
  }
}

export default GuestScreen;

//name, email, tags
