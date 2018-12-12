import React from 'react';
import { Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  text: {
    padding: 4,
    fontSize: 1,
  },
});
export default props => <Text style={styles.text}> {props.children} </Text>;
