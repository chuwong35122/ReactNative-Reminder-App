import React from 'react';
import {View, Text, FlatList, VStack, ScrollView, Flex} from 'native-base';
import {TodoInterface} from './../interface/todo.interface';
import moment from 'moment';
import {Image, StyleSheet} from 'react-native';

export const TodoItems = () => {
  const data = [
    {
      date: new Date(),
      title: 'Todo-1',
    },
    {
      date: new Date(),
      title: 'Todo-2',
    },
    {
      date: new Date(),
      title: 'Todo-3',
    },
  ];

  const _renderItem = (item: TodoInterface) => {
    return (
      <View backgroundColor="gray.600" style={styles.todoListItem}>
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
    <ScrollView>
      <FlatList
        data={data}
        renderItem={({item}) => _renderItem(item)}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  todoListItem: {
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
