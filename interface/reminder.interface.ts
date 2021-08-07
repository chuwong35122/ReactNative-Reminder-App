export interface ReminderInterface {
  date: Date;
  title: string | undefined;
}

export interface ToastInterface {
  title: string;
  status: 'success' | 'error' | 'info' | 'warning';
}

export interface ReminderInterfaceMap {
  [key: string]: ReminderInterface;
}
