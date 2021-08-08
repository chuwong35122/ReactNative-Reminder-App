import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  useToast,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {ReminderInterface} from '../interface/reminder.interface';
import {reminderValidationSchema} from '../schema/reminderValidatingSchema';
import {getAllReminderTitle, saveReminder} from '../lib/storage';

type ReminderProp = {
  isReminderChanged: boolean;
  setIsReminderChange: Dispatch<SetStateAction<boolean>>;
};

export const Reminder = ({
  isReminderChanged,
  setIsReminderChange,
}: ReminderProp) => {
  const toast = useToast();

  const handleDataSubmission = async (data: ReminderInterface) => {
    const titles = await getAllReminderTitle();
    if (data.title) {
      if (titles.includes(data.title)) {
        return toast.show({
          title: 'Please change your title.',
          placement: 'bottom',
          status: 'info',
        });
      }
      const result = await saveReminder(data);
      if (result.status === 'success') {
        setIsReminderChange(!isReminderChanged);
      }
      return toast.show({
        title: result?.title,
        placement: 'bottom',
        status: result?.status,
      });
    }
  };

  const initialValues: ReminderInterface = {
    date: new Date(),
    title: undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleDataSubmission}
      validationSchema={reminderValidationSchema}>
      {({handleChange, handleBlur, handleSubmit, errors}) => (
        <View>
          <Heading color="white">Reminder</Heading>
          <VStack backgroundColor="dark.600" style={styles.container} space={3}>
            <FormControl isRequired isInvalid={'title' in errors}>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                variant="outline"
                placeholder="Reminder Text"
                placeholderTextColor="gray.500"
                backgroundColor="gray.800"
                color="white"
                size="xl"
                isFullWidth={true}
                onBlur={handleBlur('title')}
                onChangeText={handleChange('title')}
              />
              <FormControl.ErrorMessage>
                {errors.title}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button colorScheme="dark" onPress={handleSubmit}>
              <Text color="white" fontSize="xl">
                Submit
              </Text>
            </Button>
          </VStack>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
});
