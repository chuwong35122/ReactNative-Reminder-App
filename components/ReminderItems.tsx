import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, VStack, Flex, Heading} from 'native-base';
import {ReminderInterface} from '../interface/reminder.interface';
import moment from 'moment';
import {Image, StyleSheet} from 'react-native';
import {getReminders} from '../lib/storage';

type ReminderItemsProp = {
  isReminderChanged: boolean;
};
export const ReminderItems = ({isReminderChanged}: ReminderItemsProp) => {
  const [reminderList, setReminderList] = useState<ReminderInterface[]>();

  const getReminderList = async () => {
    const result = await getReminders();
    const reminderList = [];

    if (result != null) {
      for (const k in result) {
        reminderList.push(result[k]);
      }
      setReminderList(reminderList);
      return reminderList;
    }
  };

  useEffect(() => {
    getReminderList();
  }, [isReminderChanged]);

  const _renderItem = (item: ReminderInterface) => {
    return (
      <View backgroundColor="gray.600" style={styles.listItem}>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end">
          <VStack space={1}>
            <Text color="gray.400" fontSize="sm">
              {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
            <Text color="white" fontSize="2xl">
              {item.title}
            </Text>
          </VStack>
          <Image
            source={require('../assets/icons/delete.png')}
            style={styles.iconTrash}
          />
        </Flex>
      </View>
    );
  };

  return (
    <View>
      {reminderList ? (
        <FlatList
          data={reminderList}
          renderItem={({item}) => _renderItem(item)}
          keyExtractor={item => item.id}
        />
      ) : (
        <Heading color="white">Wow... such an empty place.</Heading>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 2,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  iconDone: {
    width: 40,
    height: 40,
    color: '#f5f5f5',
  },
  iconTrash: {
    width: 40,
    height: 40,
    color: '#a3a3a3',
  },
});
