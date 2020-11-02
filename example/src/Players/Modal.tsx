import * as React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerExamples from './Examples';

import { ApollosPlayerContainer } from 'react-native-apollos-player';

const TestOne = () => {
  const { push, goBack } = useNavigation<any>();

  return (
    <ApollosPlayerContainer>
      <PlayerExamples />
      <Text>---------</Text>
      <Text onPress={() => push('Reparenting')}>Reparenting test</Text>
      <Text onPress={() => push('Push')}>Push view</Text>
      <Text onPress={() => push('Modal')}>Modal view</Text>
      <Text onPress={() => push('FullScreenModal')}>FullScreenModal view</Text>
      <Text onPress={() => push('FormSheet')}>FormSheet view</Text>
      <Text onPress={goBack}>Go Back</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
      <Text>---------</Text>
    </ApollosPlayerContainer>
  );
};

export default TestOne;
