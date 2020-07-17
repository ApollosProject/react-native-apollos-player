import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import type { IPlayerMedia, IPresentationComponents } from './types';
import FullscreenSlidingPlayer from './FullscreenSlidingPlayer';
import {
  NowPlayingContext,
  PresentationContext,
  MiniPresentationLayoutContext,
} from './context';

import FullscreenPresentation from './presentations/FullscreenPresentation';
import MiniPresentation, {
  defaultMiniPlayerSize,
} from './presentations/MiniPresentation';
import RNVideoPresentation from './presentations/RNVideoPresentation';

interface ContainerProps extends IPresentationComponents {
  miniPresentationLayout?: {
    width?: number;
    height?: number;
    xOffset?: number;
    yOffset?: number;
  };
}

const Container: React.FunctionComponent<ContainerProps> = ({
  VideoPresentationComponent = RNVideoPresentation,
  MiniPresentationComponent = MiniPresentation,
  FullScreenPresentationComponent = FullscreenPresentation,
  miniPresentationLayout: {
    width = defaultMiniPlayerSize.width,
    height = defaultMiniPlayerSize.height,
    xOffset = defaultMiniPlayerSize.xOffset,
    yOffset = defaultMiniPlayerSize.yOffset,
  } = {},
  children,
}) => {
  const [nowPlaying, setNowPlaying] = React.useState<IPlayerMedia | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  const nowPlayingState = React.useMemo(
    () => ({
      nowPlaying,
      setNowPlaying,
      isPlaying,
      setIsPlaying,
      isFullscreen,
      setIsFullscreen,
    }),
    [
      nowPlaying,
      setNowPlaying,
      isPlaying,
      setIsPlaying,
      isFullscreen,
      setIsFullscreen,
    ]
  );

  const presentationState = React.useMemo(
    () => ({
      VideoPresentationComponent,
      MiniPresentationComponent,
      FullScreenPresentationComponent,
    }),
    [
      VideoPresentationComponent,
      MiniPresentationComponent,
      FullScreenPresentationComponent,
    ]
  );

  const miniLayoutState = React.useMemo(
    () => ({
      width,
      height,
      xOffset,
      yOffset,
    }),
    [width, height, xOffset, yOffset]
  );

  return (
    <NowPlayingContext.Provider value={nowPlayingState}>
      <PresentationContext.Provider value={presentationState}>
        <MiniPresentationLayoutContext.Provider value={miniLayoutState}>
          <View style={StyleSheet.absoluteFill}>{children}</View>
          <FullscreenSlidingPlayer />
        </MiniPresentationLayoutContext.Provider>
      </PresentationContext.Provider>
    </NowPlayingContext.Provider>
  );
};

export default Container;
