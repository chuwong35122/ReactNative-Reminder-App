import React from 'react';
import {View, VStack, Heading, Text, Input, Button} from 'native-base';
import {StyleSheet} from 'react-native';

export const Todo = () => {
  const handleDataSubmission = () => {
    const date = new Date();
  };

  return (
    <View>
      <Heading color="white">Reminder</Heading>
      <VStack backgroundColor="dark.600" style={styles.container} space={3}>
        <Input
          variant="outline"
          placeholder="Reminder Text"
          placeholderTextColor="gray.500"
          backgroundColor="gray.800"
          color="white"
          size="xl"
          isFullWidth={true}
        />
        <Button colorScheme="dark" onPress={handleDataSubmission}>
          <Text color="white" fontSize="xl">
            Submit
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 10,
    borderRadius: 20,
  },
});
