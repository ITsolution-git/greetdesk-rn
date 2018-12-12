import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight,
  ListView,
  View,
} from 'react-native';

import {
  session_account_id,
  set_account_id,
  account_list,
  increment_account_list,
  account_list_id,
  set_account_list_id,
} from './storage/Session.js';
import { Router, Scene, Actions } from 'react-native-reactive';
import store from 'react-native-simple-store';

//import AttendeesScreen from './screens/AttendeesScreen';
import LoginScreen from './screens/LoginScreen';
import AccountsScreen from './screens/AccountsScreen';
import EventsScreen from './screens/EventsScreen';
import ContactsScreen from './screens/ContactsScreen';
import EventScreen from './screens/EventScreen';
import GuestsScreen from './screens/GuestsScreen';
import GuestScreen from './screens/GuestScreen';
import ContactScreen from './screens/ContactScreen.js';
import LaunchScreen from './screens/LaunchScreen.js';
import EditContactScreen from './screens/EditContactScreen.js';
import EditGuestScreen from './screens/EditGuestScreen.js';
import NewContactScreen from './screens/NewContactScreen.js';
import CameraScreen from './screens/CameraScreen.js';

export default class App extends React.Component {
  render() {
    return (
      <Router
        navigationBarStyle={{ flex: 1, backgroundColor: '#333333' }}
        titleStyle={{ color: '#FFFFFF' }}
        barButtonIconStyle={{ tintColor: '#FFFFFF' }}
        barButtonTextStyle={{ tintColor: '#FFFFFF' }}
      >
        <Scene key="root">
          <Scene
            key="launch"
            component={LaunchScreen}
            initial
            type="modal"
            hideNavBar
          />
          <Scene
            key="accounts"
            component={AccountsScreen}
            title="Accounts"
            onRight={() =>
              store
                .save('profile_data', null)
                .then(() => Actions.login({ type: 'reset' }))}
            rightTitle="Logout"
          />
          <Scene
            key="events"
            component={EventsScreen}
            title="Events"
            {...{ session_account_id, set_account_id }}
          />
          <Scene
            key="contacts"
            component={ContactsScreen}
            title="Contacts"
            onRight={() => Actions.new_contact()}
            rightTitle="+"
            {...{
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene
            key="new_contact"
            component={NewContactScreen}
            title="New Contact"
            {...{
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene key="contact" component={ContactScreen} title="Contact" />

          <Scene
            key="editcontact"
            component={EditContactScreen}
            title="Edit"
            schema="modal"
            direction="vertical"
            hideNavBar
            {...{
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene
            key="editguest"
            component={EditGuestScreen}
            title="Edit"
            schema="modal"
            direction="vertical"
            hideNavBar
            {...{
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene key="event" component={EventScreen} title="Event" />
          <Scene
            key="guests"
            component={GuestsScreen}
            title="Guests"
            onRight={() => Actions.barcode()}
            rightTitle="Scan"
            {...{
              account_list_id,
              set_account_list_id,
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />
          <Scene
            key="guest"
            component={GuestScreen}
            title="Guest"
            {...{
              account_list_id,
              set_account_list_id,
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene
            key="barcode"
            component={CameraScreen}
            title="Scanner"
            type="replace"
            hideNavBar
            {...{
              account_list_id,
              set_account_list_id,
              session_account_id,
              set_account_id,
              account_list,
              increment_account_list,
            }}
          />

          <Scene
            key="login"
            component={LoginScreen}
            title="Login"
            type="modal"
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}
