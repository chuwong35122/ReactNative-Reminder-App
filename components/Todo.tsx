import React from 'react';
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
import {TodoInterface} from './../interface/todo.interface';
import {todoValidationSchema} from '../schema/todoValidatingSchema';
import {storeTodoData} from '../lib/storage';

export const Todo = () => {
  const toast = useToast();

  const handleDataSubmission = async (data: TodoInterface) => {
    const result = await storeTodoData(data);
    return toast.show({
      title: result?.title,
      placement: 'bottom',
      status: result?.status,
    });
  };

  const initialValues: TodoInterface = {
    date: new Date(),
    title: undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleDataSubmission}
      validationSchema={todoValidationSchema}>
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
