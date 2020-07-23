import * as React from 'react';
import { Text } from 'react-native';

import { usePlayer } from 'react-native-apollos-player';

const Examples = () => {
  const { setNowPlaying, setIsPlaying, setIsFullscreen } = usePlayer();

  return (
    <React.Fragment>
      <Text
        onPress={() => {
          setNowPlaying({
            source: require('./broadchurch.mp4'),
            presentationProps: {
              title: 'Video Title',
              description: 'Video Description',
            },
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
            presentationProps: {
              badge: <Text style={{ color: 'white' }}>Live</Text>,
            },
          });
          setIsPlaying(true);
        }}
      >
        Play streaming M3u8
      </Text>
      <Text onPress={() => setIsFullscreen(true)}>Open fullscreen</Text>
    </React.Fragment>
  );
};

export default Examples;
