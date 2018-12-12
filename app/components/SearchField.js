import React, { Component } from 'react';
import styles from '../styles/layout.js';
import { View, Image, TextInput } from 'react-native';

class SearchField extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          backgroundColor: '#FFFFFF',
          padding: 5,
          margin: 20,
          borderWidth: 1,
          borderColor: '#C7E3E0',
          borderRadius: 5,
        }}
      >
        <View style={{ width: 20, paddingTop: 10 }}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../img/icon-search.png')}
          />
        </View>
        <View
          style={{
            flex: 2,
            paddingLeft: 20,
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="Search..."
            value={this.props.value}
            onChangeText={text => this.props.onChange(text)}
          />
        </View>
      </View>
    );
  }
}

export default SearchField;
