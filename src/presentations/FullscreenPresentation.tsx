import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import usePlayer from '../usePlayer';

const FullscreenPresentation = () => {
  const { setIsFullscreen, isFullscreen, setNowPlaying } = usePlayer();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Text>FullscreenPresentation</Text>
      <Button
        onPress={() => setIsFullscreen(!isFullscreen)}
        title="Go Minimized"
      />
      <Button
        onPress={() => {
          setNowPlaying(null);
          setIsFullscreen(false);
        }}
        title="Close media"
      />
    </View>
  );
};

export default FullscreenPresentation;
