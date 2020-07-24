import * as React from 'react';
import type { IPlayerMedia, IPresentationComponents } from './types';
import FullscreenSlidingPlayer from './FullscreenSlidingPlayer';
import {
  NowPlayingContext,
  PresentationContext,
  MiniPresentationLayoutContext,
  InternalPlayerContext,
} from './context';

import FullscreenPresentation from './presentations/FullscreenPresentation';
import MiniPresentation, {
  defaultMiniPlayerSize,
} from './presentations/MiniPresentation';
import RNVideoPresentation from './presentations/RNVideoPresentation';

interface ContainerProps extends IPresentationComponents {
  /**
   * Controls the layout and size of the mini player.
   */
  miniPresentationLayout?: {
    width?: number;
    height?: number;
    /** additional offset from horizontal edge of screen */
    xOffset?: number;
    /**
     * additional offset from vertical edge of screen.
     * Ex: Increase when rendering above a tab-bar
     */
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
  const [seek, setSeekHandler] = React.useState<(seekTo: number) => void>(
    () => {}
  );
  const [skip, setSkipHandler] = React.useState<(skipBy: number) => void>(
    () => {}
  );
  const [
    isControlVisibilityLocked,
    setIsControlVisibilityLocked,
  ] = React.useState<boolean>(false);

  const reset = React.useMemo(
    () => () => {
      setNowPlaying(null);
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
      reset,
      seek,
      skip,
    }),
    [
      nowPlaying,
      setNowPlaying,
      isPlaying,
      setIsPlaying,
      isFullscreen,
      setIsFullscreen,
      reset,
      seek,
      skip,
    ]
  );

  const internalPlayerState = React.useMemo(
    () => ({
      playerId,
      setPlayerId,
      setSeekHandler,
      setSkipHandler,
      setIsControlVisibilityLocked,
      isControlVisibilityLocked,
    }),
    [
      playerId,
      setPlayerId,
      setSeekHandler,
      setSkipHandler,
      setIsControlVisibilityLocked,
      isControlVisibilityLocked,
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
          <InternalPlayerContext.Provider value={internalPlayerState}>
            <FullscreenSlidingPlayer isMasterPlayer />
            {children}
          </InternalPlayerContext.Provider>
        </MiniPresentationLayoutContext.Provider>
      </PresentationContext.Provider>
    </NowPlayingContext.Provider>
  );
};

export default Container;
