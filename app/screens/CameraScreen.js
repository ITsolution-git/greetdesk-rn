/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Text,
  AlertIOS,
  View,
} from 'react-native';
import Camera from 'react-native-camera';

import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/layout.js';
import store from 'react-native-simple-store';

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../utils/constants';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      blocked: false,
    };
  }

  goBack() {
    Actions.pop();
  }

  _onBarCodeRead(e) {
    if (!this.state.blocked) {
      this.setState({ blocked: true, visible: true });
      store.get('profile_data').then(data => {
        if (data === null || data === undefined) {
          // redirect to home page
        } else {
            fetch(
              `${API_BASE_URL}/lists/${this.props.account_list_id}/contacts/${e.data}/checkin.json`,
              {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer ' + data,
                },
              }
            )
            .then(response => response.json())
            .then(responseData => {
              this.setState({ visible: false });
              this.props.increment_account_list();
              Alert.alert(
                'Success',
                'Barcode Scanned Successfully!'
              );
              Actions.pop({ refresh: { reload: true } });
            })
            .catch(error => {
              this.setState({visible:false});
              Alert.alert(
                'Error',
                'Barcode was not recognized'
              );
              Actions.pop();
            });
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container_empty}>
        <Spinner visible={this.state.visible} />
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          onBarCodeRead={e => {
            this._onBarCodeRead(e);
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
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
            onPress={this.goBack.bind(this)}
            underlayColor="#99d9f4"
          >
            <Text style={{ fontSize: 18, color: 'white', alignSelf: 'center' }}>
              Cancel
            </Text>
          </TouchableHighlight>
        </Camera>

      </View>
    );
  }
}
