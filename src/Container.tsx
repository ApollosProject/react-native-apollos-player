import * as React from 'react';
import type {
  IPlayerMedia,
  IPresentationComponents,
  IProgressProp,
} from './types';
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
  const [isInPiP, setIsInPiP] = React.useState<boolean>(false);
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
  const [progressHandlers, setProgressHandlers] = React.useState<
    Array<(props: IProgressProp) => void>
  >([]);

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

  const onProgress = React.useMemo(
    () => (handlerToAdd: (props: IProgressProp) => void) => {
      setProgressHandlers((prevState) => [...prevState, handlerToAdd]);
      return () =>
        setProgressHandlers((prevState) =>
          prevState.filter((handler) => handler === handlerToAdd)
        );
    },
    [setProgressHandlers]
  );

  const handleProgress = React.useMemo(
    () => (playhead: {
      currentTime: number;
      playableDuration: number;
      seekableDuration: number;
    }) => {
      progressHandlers.forEach((handler) => handler(playhead));
    },
    [progressHandlers]
  );

  const internalPlayerState = React.useMemo(
    () => ({
      onProgress,
      handleProgress,
      playerId,
      setPlayerId,
      setSeekHandler,
      setSkipHandler,
      setIsControlVisibilityLocked,
      isControlVisibilityLocked,
      isInPiP,
      setIsInPiP,
    }),
    [
      playerId,
      setPlayerId,
      setSeekHandler,
      setSkipHandler,
      setIsControlVisibilityLocked,
      isControlVisibilityLocked,
      handleProgress,
      onProgress,
      isInPiP,
      setIsInPiP,
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
            <FullscreenSlidingPlayer>{children}</FullscreenSlidingPlayer>
          </InternalPlayerContext.Provider>
        </MiniPresentationLayoutContext.Provider>
      </PresentationContext.Provider>
    </NowPlayingContext.Provider>
  );
};

export default Container;
