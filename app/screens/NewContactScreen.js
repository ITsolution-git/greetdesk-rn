// @flow
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import layout from '../styles/layout.js';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { API_BASE_URL } from '../utils/constants';

export default class CreateContact extends Component {
  state = {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      tags: '',
    },
  };

  onChange = field =>
    value => {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [field]: value,
        },
      });
    };

  handleSubmit = async () => {
    const data = await store.get('profile_data');
    const { firstName, lastName, email, tags } = this.state.form;
    try {
      const response = await fetch(
        `${API_BASE_URL}/contacts.json`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + data,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            tags: tags.trim().split(','),
            account: this.props.session_account_id,
          }),
        }
      );
      const json = await response.json();
      this.setState({ visible: false });
      Alert.alert('Success', 'Created Contact');
      console.log('created contact', json);
      this.props.increment_account_list();
      Actions.contact({
        type: 'replace',
        contact_id: json['id'],
        account_id: this.props.session_account_id,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create contact, please try again');
      console.warn(error);
      this.setState({ visible: false });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView style={[layout.container, { display: 'flex' }]}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 400 }}>
            <TextInput
              placeholder="First name"
              value={this.state.form.firstName}
              onChange={this.onChange('firstName')}
            />
            <TextInput
              placeholder="Last name"
              value={this.state.form.lastName}
              onChange={this.onChange('lastName')}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.form.email}
              onChange={this.onChange('email')}
            />
            <TextInput
              placeholder="Tags"
              value={this.state.form.tags}
              onChange={this.onChange('tags')}
            />
            <Button onPress={this.handleSubmit}>
              Submit
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

// class NewContactScreen extends Component {
//   constructor() {
//     super();
//     const ds = new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2,
//     });
//     this.state = {
//       visible: false,
//       dataSource: ds.cloneWithRows([]),
//     };
//   }
//
//   onPress() {
//     store.get('profile_data').then(data => {
//       var value = this.refs['form'].getValue();
//
//       if (value) {
//         this.setState({ visible: true, value: value });
//         fetch('http://greetdesk.com//api/v1/contacts.json', {
//           method: 'POST',
//           headers: {
//             Authorization: 'Bearer ' + data,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             firstName: value['firstName'],
//             lastName: value['lastName'],
//             email: value['email'],
//             tags: value['tags'].split(','),
//             account: this.props.session_account_id,
//           }),
//         })
//           .then(response => response.json())
//           .then(responseData => {
//             this.setState({ visible: false });
//             this.props.increment_account_list();
//             Actions.contact({
//               type: 'replace',
//               contact_id: responseData['id'],
//               account_id: this.props.session_account_id,
//             });
//           })
//           .catch(error => {
//             this.setState({ visible: false });
//             console.warn(error);
//           });
//       }
//
//       if (value) {
//         // if validation fails, value will be null
//         console.log(value); // value here is an instance of Person
//       }
//     });
//   }
//
//   componentDidMount() {}
//
//   render() {
//     return (
//       <View style={layout.container_without_header}>
//         <Spinner visible={this.state.visible} />
//         <Form
//           ref="form"
//           type={Person}
//           options={options}
//           value={this.state.value}
//         />
//         <TouchableHighlight
//           style={layout.button}
//           onPress={() => {
//             this.onPress();
//           }}
//           underlayColor="#99d9f4"
//         >
//           <Text style={layout.buttonText}>Save</Text>
//         </TouchableHighlight>
//
//         <TouchableHighlight
//           style={layout.button}
//           onPress={() => {
//             Actions.pop();
//           }}
//           underlayColor="#99d9f4"
//         >
//           <Text style={layout.buttonText}>Back</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// export default NewContactScreen;

//name, email, tags
