import React from 'react';
import { View, Image } from 'react-native';

import styles from '../styles/layout';

export default ({ children }) => (
  <View style={styles.container}>
    {children}
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Image
        style={{ width: 140, height: 30, margin: 10, justifyContent: 'center' }}
        source={require('../img/logo-footer.png')}
      />
    </View>
  </View>
);
