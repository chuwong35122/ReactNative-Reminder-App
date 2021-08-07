/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {HomeScreen} from './Screens/HomeScreen';
import {NativeBaseProvider} from 'native-base';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <HomeScreen />
      </NativeBaseProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
