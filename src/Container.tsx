import * as React from 'react';
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
  const [playerId, setPlayerId] = React.useState<string>('');

  const reset = React.useMemo(
    () => () => {
      setNowPlaying(null);
      // setPlayerId(''); TODO: should we call this?
      setIsPlaying(false);
      setIsFullscreen(false);
    },
    [setNowPlaying, setIsPlaying, setIsFullscreen]
  );

  const nowPlayingState = React.useMemo(
    () => ({
      nowPlaying,
      setNowPlaying,
      isPlaying,
      setIsPlaying,
      isFullscreen,
      setIsFullscreen,
      playerId,
      setPlayerId,
      reset,
    }),
    [
      nowPlaying,
      setNowPlaying,
      isPlaying,
      setIsPlaying,
      isFullscreen,
      setIsFullscreen,
      playerId,
      setPlayerId,
      reset,
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

  console.log('Container', { nowPlaying, isPlaying, isFullscreen, playerId });

  return (
    <NowPlayingContext.Provider value={nowPlayingState}>
      <PresentationContext.Provider value={presentationState}>
        <MiniPresentationLayoutContext.Provider value={miniLayoutState}>
          {children}
          <FullscreenSlidingPlayer isMasterPlayer />
        </MiniPresentationLayoutContext.Provider>
      </PresentationContext.Provider>
    </NowPlayingContext.Provider>
  );
};

export default Container;
