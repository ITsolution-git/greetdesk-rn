import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableHighlight,
  View,
  processColor,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { BASE_URL } from '../utils/constants';
import Browser from 'react-native-browser';

import t from 'tcomb-form-native';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';

var Form = t.form.Form;
// here we are: define your domain model
var Person = t.struct({
  login: t.String,
  password: t.String,
});

var options = {
  fields: {
    login: {
      keyboardType: 'email-address',
      spellCheck: false,
      autoCapitalize: 'none',
      autoCorrect: false,
    },
    password: {
      password: true,
      secureTextEntry: true,
    },
  },
}; // optional rendering options (see documentation)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6FB8AF',
  },
  input_container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#43a2bf',
    borderColor: '#3b93ad',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default class LoginScreen extends React.Component {

  onPress = () => {
    var value = this.refs['form'].getValue();
    if (value) {
      fetch(`${BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: value['password'],
          username: value['login'],
          grant_type: "password",
          client_id: "4a5b2b90c5908c59c7b8135eca5bbf0dcc2bbc5e7e1e0abce8ec1b3323a27f68",
          client_secret: "7227f712d43c75f51aed89dfdba2a3a24561d667b662d36023530ee344397f81",
          // client_id: 'K0mHMqdgO5g-0aAM',
          // client_secret: 'UQyio4TnZiLd6QzZ4QjyBBt9a7q-4I_8kanUO_UZx9Pr8rfp9MjMRmbcfaRMifRl',
        }),
      })
        .then(response => response.json())
        .then(responseData => {
          if (!responseData['error']) {
            // console.warn(navigator);
            store
              .save('profile_data', responseData['access_token'])
              .then(() => Actions.accounts({ type: 'reset' }));
          } else {
            Alert.alert('Login Failed', responseData['error']);
          }
        });
    }

    if (value) {
      // if validation fails, value will be null
    }
  }

  forgottenPassword = () => {
    if(Platform.OS === 'ios') { // react-native-browser is only built for ios not android
      Browser.open(`http://greetdesk.com/users/password/new`, {
        showUrlWhileLoading: true,
        loadingBarTintColor: processColor('#d64bbd'),
        navigationButtonsHidden: false,
        showActionButton: true,
        showDoneButton: true,
        doneButtonTitle: 'Done',
        showPageTitles: true,
        disableContextualPopupMenu: false,
        hideWebViewBoundaries: false,
        buttonTintColor: processColor('#d64bbd'),
      });
    } else {
      Linking.openURL(`http://greetdesk.com/users/password/new`);
    }
  }

  signup = () => {
    if(Platform.OS === 'ios') { // react-native-browser is only built for ios not android
      Browser.open(`http://greetdesk.com/users/sign_up`, {
        showUrlWhileLoading: true,
        loadingBarTintColor: processColor('#d64bbd'),
        navigationButtonsHidden: false,
        showActionButton: true,
        showDoneButton: true,
        doneButtonTitle: 'Done',
        showPageTitles: true,
        disableContextualPopupMenu: false,
        hideWebViewBoundaries: false,
        buttonTintColor: processColor('#d64bbd'),
      });
    } else {
      Linking.openURL(`http://greetdesk.com/users/sign_up`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ position: 'absolute', alignSelf: 'flex-end', left: 0 }}
          source={require('../img/big-g.png')}
        />
        <View style={styles.input_container}>
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Image
              style={{ width: 186, height: 40, justifyContent: 'center' }}
              source={require('../img/logo-footer.png')}
            />
          </View>
          <Form ref="form" type={Person} options={options} />
          <KeyboardAvoidingView behaviour="padding">
            <TouchableOpacity
              style={{
                alignSelf: 'stretch',
                backgroundColor: '#C7E3E0',
                borderColor: '#C7E3E0',
                borderWidth: 1,
                borderRadius: 8,
                justifyContent: 'center',
                padding: 10,
              }}
              onPress={() => {
                this.onPress();
              }}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={{
              alignSelf: 'stretch',
              justifyContent: 'center',
              padding: 10,
              marginTop: 20,
            }}
            onPress={() => {
              this.forgottenPassword();
            }}
          >
            <Text style={styles.buttonText}>Forgotten password?</Text>
          </TouchableOpacity>

        </View>

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              this.signup();
            }}
          >
            <Text style={styles.buttonText}>
              Create a new Greetdesk account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
