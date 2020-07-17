import * as React from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';

import usePlayer from '../usePlayer';

const MiniPresentation = () => {
  const { setIsFullscreen, isFullscreen } = usePlayer();
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: 'rgba(255,0,0,0.5)' }, // eslint-disable-line react-native/no-inline-styles
      ]}
    >
      <Text>MiniPresentation</Text>
      <Button
        onPress={() => setIsFullscreen(!isFullscreen)}
        title="Go Fullscreen"
      />
    </View>
  );
};

const screen = Dimensions.get('screen');

export const defaultMiniPlayerSize = {
  width: Math.min(screen.width * 0.3, 240),
  height: 0,
  xOffset: 16,
  yOffset: 24,
};

defaultMiniPlayerSize.height = defaultMiniPlayerSize.width * (9 / 16);

export default MiniPresentation;