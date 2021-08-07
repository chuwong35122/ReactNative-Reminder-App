import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {Todo} from '../components/Todo';

export const HomeScreen = () => {
  return (
    <View style={styles.container} backgroundColor="dark.100">
      <Todo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
});
