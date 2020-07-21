import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { usePlayer, VideoPreviewMiniIOS } from 'react-native-apollos-player';

const TestOne = () => {
  const { setNowPlaying, setIsPlaying, setIsFullscreen } = usePlayer();
  const { navigate, goBack } = useNavigation();

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
      <Text onPress={() => navigate('Reparenting')}>Reparenting test</Text>
      <Text onPress={() => navigate('Push')}>Push view</Text>
      <Text onPress={() => navigate('Modal')}>Modal view</Text>
      <Text onPress={() => navigate('FullScreenModal')}>
        FullScreenModal view
      </Text>
      <Text onPress={() => navigate('FormSheet')}>FormSheet view</Text>
      <Text onPress={goBack}>Go Back</Text>
      <VideoPreviewMiniIOS />
    </SafeAreaView>
  );
};

export default TestOne;
