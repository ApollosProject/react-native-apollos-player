import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import usePlayer from '../usePlayer';

const FullscreenPresentation = () => {
  const { setIsFullscreen, isFullscreen, reset } = usePlayer();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Text>FullscreenPresentation{'\n\n'}</Text>
      <Button
        onPress={() => setIsFullscreen(!isFullscreen)}
        title="Go Minimized"
      />
      <Button onPress={reset} title="Close media" />
    </View>
  );
};

export default FullscreenPresentation;
