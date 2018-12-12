import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default props => (
  <View>
    <Text style={styles.label}>{props.placeholder}</Text>
    <TextInput
      autoCapitalize="none"
      placeholder={props.placeholder}
      autoCorrect={false}
      keyboardType={props.keyboardType}
      onChange={event => props.onChange(event.nativeEvent.text)}
      style={styles.default}
    />
  </View>
);

const styles = StyleSheet.create({
  default: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    fontSize: 18,
    padding: 10,
    margin: 5,
  },
  label: {
    margin: 5,
    fontSize: 18,
  },
});
