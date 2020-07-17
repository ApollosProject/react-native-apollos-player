import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import usePlayer from '../usePlayer';

const FullscreenPresentation = () => {
  const { setIsFullscreen, isFullscreen } = usePlayer();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: 'rgba(0,255,0,0.5)' }, // eslint-disable-line react-native/no-inline-styles
      ]}
    >
      <Text>FullscreenPresentation</Text>
      <Button
        onPress={() => setIsFullscreen(!isFullscreen)}
        title="Go Minimized"
      />
    </View>
  );
};

export default FullscreenPresentation;
