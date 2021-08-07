import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoInterface} from '../interface/todo.interface';

export async function storeTodoData(data: TodoInterface) {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(data.id, jsonData);
  } catch (e) {
    console.error(e);
  }
}

export async function getTodoDataId() {
  try {
    const jsonData = await AsyncStorage.getItem('todoId');
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (e) {
    console.error(e);
  }
}
