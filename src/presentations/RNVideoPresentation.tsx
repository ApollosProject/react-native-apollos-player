import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import usePlayer from '../usePlayer';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFillObject,
  },
});

const RNVideoPresentation = () => {
  const { nowPlaying, isPlaying } = usePlayer();
  console.log({ nowPlaying, isPlaying }, !isPlaying);

  if (!nowPlaying?.source) return <View />;
  return (
    <Video
      source={nowPlaying.source}
      paused={!isPlaying}
      ignoreSilentSwitch={'ignore'}
      allowsExternalPlayback
      playInBackground
      playWhenInactive
      // onAudioBecomingNoisy={this.handlePause}
      // onEnd={this.handleOnEnd}
      resizeMode={'contain'}
      // style={StyleSheet.absoluteFill}
      // volume={mediaPlayer.muted ? 0 : 1}
      style={styles.background}
    />
  );
};

export default RNVideoPresentation;
