import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  text: {
    // fontSize: 20,
    // backgroundColor: '#FFF',
    // color: 'grey',
    // margin: 8,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // textAlign: 'center',
    borderWidth: 1,
    borderColor: '#C7E3E0',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7E3E0',
  },
  container: {
    alignItems: 'center',
  },
});
export default props => (
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor="#99d9f4"
    style={styles.container}
  >
    <Text style={styles.text}>
      {props.children}
    </Text>
  </TouchableHighlight>
);
