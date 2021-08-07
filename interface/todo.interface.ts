export interface TodoInterface {
  date: Date;
  title: string | undefined;
}

export interface ToastInterface {
  title: string;
  status: 'success' | 'error' | 'info' | 'warning';
}
