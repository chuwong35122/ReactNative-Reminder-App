import * as Yup from 'yup';

export const reminderValidationSchema = Yup.object().shape({
  title: Yup.string().required('This is required'),
  note: Yup.string(),
});
