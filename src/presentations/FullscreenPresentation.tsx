import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import usePlayer from '../usePlayer';

const FullscreenPresentation = () => {
  const {
    setIsFullscreen,
    isFullscreen,
    isPlaying,
    setIsPlaying,
    reset,
    skip,
    seek,
  } = usePlayer();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Text>FullscreenPresentation{'\n\n'}</Text>
      <Button
        onPress={() => setIsFullscreen(!isFullscreen)}
        title="Go Minimized"
      />
      <Button onPress={reset} title="Close media" />
      <Button
        onPress={() => setIsPlaying(!isPlaying)}
        title={isPlaying ? 'Pause' : 'Play'}
      />
      <Button onPress={() => skip(-5)} title={'Skip back'} />
      <Button onPress={() => skip(5)} title={'Skip forward'} />
      <Button onPress={() => seek(0)} title={'Seek to beginning'} />
    </View>
  );
};

export default FullscreenPresentation;
