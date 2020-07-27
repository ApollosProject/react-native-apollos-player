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
              coverImage: { uri: 'https://picsum.photos/100/100' },
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
            source: require('./broadchurch.mp4'),
            presentationProps: {
              title: 'Video Title',
              description: 'Video Description',
            },
          });
          setIsPlaying(true);
        }}
      >
        Play local MP4 (no cover image)
      </Text>
      <Text
        onPress={() => {
          setNowPlaying({
            source: {
              uri:
                'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            },
            presentationProps: {
              title: 'Video Title',
              description: 'Video Description',
              badge: (
                <Text style={{ color: 'white' }}>
                  <Text style={{ color: 'red' }}>●</Text> Live
                </Text>
              ),
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
