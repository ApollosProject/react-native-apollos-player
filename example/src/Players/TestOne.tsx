import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TestOne = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <SafeAreaView>
      <Text onPress={() => navigate('Reparenting')}>Reparenting test</Text>
      <Text onPress={() => navigate('Push')}>Push view</Text>
      <Text onPress={() => navigate('Modal')}>Modal view</Text>
      <Text onPress={() => navigate('VideoTests')}>Vanilla RN-Video Test</Text>
      <Text onPress={() => navigate('FullScreenModal')}>
        FullScreenModal view
      </Text>
      <Text onPress={() => navigate('FormSheet')}>FormSheet view</Text>
      <Text onPress={goBack}>Go Back</Text>
    </SafeAreaView>
  );
};

export default TestOne;
