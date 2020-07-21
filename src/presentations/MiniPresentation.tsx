import * as React from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';

import usePlayer from '../usePlayer';

export interface MiniPresentationProps {}

const MiniPresentation: React.FunctionComponent<MiniPresentationProps> = () => {
  const { setIsFullscreen, isFullscreen } = usePlayer();
  return (
    <View style={StyleSheet.absoluteFill}>
      <Text>MiniPresentation</Text>
      <Button
        onPress={() => {
          setIsFullscreen(!isFullscreen);
        }}
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
