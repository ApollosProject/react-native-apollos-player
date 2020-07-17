import React from 'react';
import { Button } from 'react-native';

import { usePlayer } from 'react-native-apollos-player';

const TestOne = () => {
  const { setNowPlaying, setIsPlaying } = usePlayer();

  return (
    <>
      <Button
        title="Play local MP4"
        onPress={() => {
          setNowPlaying({
            source: require('./broadchurch.mp4'),
          });
          setIsPlaying(true);
        }}
      />
      <Button
        title="Play streaming M3u8"
        onPress={() => {
          setNowPlaying({
            source: {
              uri:
                'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            },
          });
          setIsPlaying(true);
        }}
      />
    </>
  );
};

export default TestOne;
