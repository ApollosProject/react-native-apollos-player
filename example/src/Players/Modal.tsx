import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerExamples from './Examples';

import { VideoPreviewMiniIOS } from 'react-native-apollos-player';

const TestOne = () => {
  const { push, goBack } = useNavigation<any>();

  return (
    <SafeAreaView>
      <PlayerExamples />
      <Text>---------</Text>
      <Text onPress={() => push('Reparenting')}>Reparenting test</Text>
      <Text onPress={() => push('Push')}>Push view</Text>
      <Text onPress={() => push('Modal')}>Modal view</Text>
      <Text onPress={() => push('FullScreenModal')}>FullScreenModal view</Text>
      <Text onPress={() => push('FormSheet')}>FormSheet view</Text>
      <Text onPress={goBack}>Go Back</Text>
      <VideoPreviewMiniIOS />
    </SafeAreaView>
  );
};

export default TestOne;
