import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid-random';
import {
  ToastInterface,
  ReminderInterface,
  ReminderInterfaceMap,
} from '../interface/reminder.interface';

export async function saveReminder(
  data: ReminderInterface,
): Promise<ToastInterface> {
  const ID = uuid();

  const result = await AsyncStorage.getItem('reminder');
  try {
    if (result != null) {
      const reminderList = JSON.parse(result);
      reminderList[ID] = data;
      await AsyncStorage.setItem('reminder', JSON.stringify(reminderList));
    } else {
      const newReminderList = {
        [ID]: data,
      };
      await AsyncStorage.setItem('reminder', JSON.stringify(newReminderList));
    }
    return {title: 'Reminder added.', status: 'success'};
  } catch (e) {
    console.error('Cannot add reminder.');
    return {title: 'Reminder cannot be added.', status: 'error'};
  }
}

export async function getReminders(): Promise<
  ReminderInterfaceMap | undefined
> {
  try {
    const data = await AsyncStorage.getItem('reminder');
    if (data != null) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Cannot retrieve reminders.');
  }

  return;
}

export async function getReminderList(): Promise<
  ReminderInterface[] | undefined
> {
  const result = await getReminders();
  const reminderList = [];

  if (result != null) {
    for (const k in result) {
      reminderList.push(result[k]);
    }
    return reminderList;
  }

  return;
}

export async function deleteReminder(title: string): Promise<ToastInterface> {
  const data = await getReminderList();
  if (data) {
    const filtered = data.filter(reminder => reminder.title !== title);
    const map: ReminderInterfaceMap = {};
    filtered.forEach(reminder => {
      const ID = uuid();
      map[ID] = reminder;
    });

    try {
      await AsyncStorage.setItem('reminder', JSON.stringify(map));
      return {title: 'Reminder deleted.', status: 'success'};
    } catch (err) {
      console.error('Cannot delete reminder.');
    }
  }

  return {title: 'Reminder cannot be deleted.', status: 'error'};
}

export async function clearStorage() {
  try {
    AsyncStorage.clear();
  } catch (e) {}
}

export async function getAllReminderTitle() {
  const data = await getReminderList();
  const titles: string[] = [];
  if (data) {
    data.forEach(reminder => {
      if (reminder.title) {
        titles.push(reminder.title);
      }
    });
  }
  return titles;
}
