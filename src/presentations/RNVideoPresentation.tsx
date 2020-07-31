import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { styled } from '@apollosproject/ui-kit';
import usePlayer from '../usePlayer';

import { InternalPlayerContext } from '../context';

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
  const { nowPlaying, isPlaying, isFullscreen, setIsPlaying } = usePlayer();

  const { setSkipHandler, setSeekHandler, handleProgress } = React.useContext(
    InternalPlayerContext
  );

  const playheadRef = React.useRef({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });

  const handleProgressProp = React.useMemo(
    () => (playhead: {
      currentTime: number;
      playableDuration: number;
      seekableDuration: number;
    }) => {
      playheadRef.current = playhead;
      handleProgress(playhead);
    },
    [playheadRef, handleProgress]
  );

  const videoRef = React.useRef<Video>(null);

  const skip = React.useMemo(
    () => (skipBy: number) => {
      videoRef?.current?.seek(
        Math.max(
          0,
          Math.min(
            playheadRef.current.currentTime + skipBy,
            playheadRef.current.seekableDuration
          )
        )
      );
    },
    [videoRef, playheadRef]
  );

  setSkipHandler(() => skip);

  const seek = React.useMemo(
    () => (seekBy: number) => videoRef?.current?.seek(seekBy),
    [videoRef]
  );

  setSeekHandler(() => seek);

  return (
    <Container isFullscreen={isFullscreen}>
      {nowPlaying?.source ? (
        <Video
          ref={videoRef}
          source={nowPlaying?.source}
          paused={!isPlaying}
          ignoreSilentSwitch={'ignore'}
          allowsExternalPlayback
          playInBackground
          playWhenInactive
          onProgress={handleProgressProp}
          onAudioBecomingNoisy={() => setIsPlaying(false)}
          onEnd={() => {
            setIsPlaying(false);
          }}
          repeat
          resizeMode={'contain'}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </Container>
  );
};

export default RNVideoPresentation;
