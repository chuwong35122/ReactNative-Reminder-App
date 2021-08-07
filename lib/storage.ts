import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastInterface, TodoInterface} from '../interface/todo.interface';

export async function storeTodoData(
  data: TodoInterface,
): Promise<ToastInterface> {
  if (data.title) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(data.title, jsonData);
      return {title: 'TODO created.', status: 'success'};
    } catch (e) {
      console.error(e);
    }
  }
  return {title: 'TODO creation failed.', status: 'error'};
}

export async function getAllKeys() {
  try {
    const keys = AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.error('Cannot retrieve keys.');
  }
}

export async function getAllItems() {
  const keys = await getAllKeys();
  const todoItems: TodoInterface[] = [];

  if (keys != null) {
    for (const key in keys) {
      const data = await AsyncStorage.getItem(key);
      try {
        if (data != null) {
          todoItems.push(JSON.parse(data));
        }
      } catch (e) {
        console.error('Cannot getAllItems');
      }
    }
  }
  return todoItems;
}
