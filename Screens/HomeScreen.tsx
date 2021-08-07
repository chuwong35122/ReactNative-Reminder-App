import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {Reminder} from '../components/Reminder';
import {ReminderItems} from '../components/ReminderItems';

export const HomeScreen = () => {
  const [isReminderChanged, setIsReminderChanged] = useState(false);

  return (
    <View style={styles.container} backgroundColor="dark.100">
      <Reminder
        isReminderChanged={isReminderChanged}
        setIsReminderChange={setIsReminderChanged}
      />
      <ReminderItems isReminderChanged={isReminderChanged} />
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
