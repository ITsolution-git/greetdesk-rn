import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

const ContactsHeader = props => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChange={text => {
        var rows = [];
        for (var i = 0; i < this.state.data_array.length; i++) {
          var stateName = data_array[i].toLowerCase();
          if (stateName.search(text.toLowerCase()) !== -1) {
            rows.push(data_array[i]);
          }
        }
        this.setState({ dataSource: ds.cloneWithRows(rows) });
      }}
    />
  </View>
);

export default ContactsHeader;
