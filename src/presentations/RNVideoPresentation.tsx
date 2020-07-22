import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { styled } from '@apollosproject/ui-kit';
import usePlayer from '../usePlayer';

const Container = styled(
  ({ isFullscreen, theme }: any) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.black,
    borderRadius: !isFullscreen ? theme.sizing.baseUnit : 0,
    overflow: 'hidden',
    ...(Platform.select(theme?.shadows?.default) as object),
  }),
  'ApollosPlayer.RNVideoPresentation.Container'
)(View);

const RNVideoPresentation = () => {
  const { nowPlaying, isPlaying, isFullscreen } = usePlayer();
  console.log('RNVideo', { nowPlaying, isPlaying });

  return (
    <Container isFullscreen={isFullscreen}>
      {nowPlaying?.source ? (
        <Video
          source={nowPlaying?.source}
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
          repeat
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </Container>
  );
};

export default RNVideoPresentation;
