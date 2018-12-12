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
import { Col, Row, Grid } from 'react-native-easy-grid';
var t = require('tcomb-form-native');
var Form = t.form.Form;

import { Actions } from 'react-native-router-flux';
import { API_BASE_URL } from '../utils/constants';

// here we are: define your domain model
var Person = t.struct({
  name: t.String,
  email: t.String,
  tags: t.String,
});

var options = {
  fields: {},
};

class EditGuestScreen extends Component {
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

  onPress() {
    store.get('profile_data').then(data => {
      var value = this.refs['form'].getValue();

      if (value) {
        this.setState({ visible: true, value: value });
        fetch(
          `${API_BASE_URL}/contacts/${this.props.contact_id}.json`,
          {
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + data,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: value['name'],
              email: value['email'],
              tags: value['tags'].split(','),
            }),
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.setState({ visible: false });
            this.props.increment_account_list();
            Actions.pop({ refresh: { reload: true } });
          })
          .catch(error => {
            this.setState({ visible: false });
            Alert.alert('Login Failed',error.toString());
            console.warn(error);
          });
      }

      if (value) {
        // if validation fails, value will be null
        console.log(value); // value here is an instance of Person
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
            this.refs['form'];
            this.setState({
              visible: false,
              value: {
                name: responseData['name'],
                email: responseData['email'],
                tags: responseData['tags'].join(', '),
              },
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
      <View style={styles.container_without_header}>
        <Spinner visible={this.state.visible} />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Form
            ref="form"
            type={Person}
            options={options}
            value={this.state.value}
          />
        </View>

        <TouchableHighlight
          style={{
            backgroundColor: '#C7E3E0',
            borderColor: '#C7E3E0',
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            padding: 10,
            margin: 10,
          }}
          onPress={() => {
            this.onPress();
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{
            backgroundColor: '#C7E3E0',
            borderColor: '#C7E3E0',
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            padding: 10,
            margin: 10,
          }}
          onPress={() => {
            Actions.pop();
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default EditGuestScreen;

//name, email, tags
