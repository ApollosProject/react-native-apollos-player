import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { usePlayer, VideoPreviewMiniIOS } from 'react-native-apollos-player';

const TestOne = () => {
  const { setNowPlaying, setIsPlaying, setIsFullscreen } = usePlayer();
  const { push, goBack } = useNavigation<any>();

  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          setNowPlaying({
            source: require('./broadchurch.mp4'),
          });
          setIsPlaying(true);
        }}
      >
        Play local MP4
      </Text>
      <Text
        onPress={() => {
          setNowPlaying({
            source: {
              uri:
                'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            },
          });
          setIsPlaying(true);
        }}
      >
        Play streaming M3u8
      </Text>
      <Text onPress={() => setIsFullscreen(true)}>Open fullscreen</Text>
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
