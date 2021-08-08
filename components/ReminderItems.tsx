import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  FlatList,
  VStack,
  Flex,
  Heading,
  Pressable,
  useToast,
} from 'native-base';
import {ReminderInterface} from '../interface/reminder.interface';
import moment from 'moment';
import {Image, StyleSheet} from 'react-native';
import {deleteReminder, getReminders} from '../lib/storage';

type ReminderItemsProp = {
  isReminderChanged: boolean;
  setIsReminderChanged: Dispatch<SetStateAction<boolean>>;
};
export const ReminderItems = ({
  isReminderChanged,
  setIsReminderChanged,
}: ReminderItemsProp) => {
  const toast = useToast();
  const [reminderList, setReminderList] = useState<ReminderInterface[]>();

  const getReminderList = async () => {
    const result = await getReminders();
    const reminderListTemp = [];

    if (result != null) {
      for (const k in result) {
        reminderListTemp.push(result[k]);
      }
      setReminderList(reminderListTemp);
      return reminderList;
    }
  };

  useEffect(() => {
    getReminderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReminderChanged]);

  const handleReminderDeletion = async (item: ReminderInterface) => {
    if (item.title != null) {
      const result = await deleteReminder(item.title);
      if (result.status === 'success') {
        setIsReminderChanged(!isReminderChanged);
      }
      return toast.show({
        title: result?.title,
        placement: 'bottom',
        status: result?.status,
      });
    }
  };

  const _renderItem = (item: ReminderInterface, index: number) => {
    return (
      <View backgroundColor="gray.600" style={styles.listItem} key={index}>
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
          <Pressable onPress={() => handleReminderDeletion(item)}>
            <Image
              source={require('../assets/icons/delete.png')}
              style={styles.iconTrash}
            />
          </Pressable>
        </Flex>
      </View>
    );
  };

  return (
    <View flex={1}>
      {reminderList ? (
        <FlatList
          data={reminderList}
          renderItem={({item, index}) => _renderItem(item, index)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
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
  iconTrash: {
    width: 40,
    height: 40,
  },
});
