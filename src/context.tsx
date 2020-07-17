import * as React from 'react';

import type {
  IMiniPresentationLayout,
  IPresentationComponents,
  INowPlaying,
} from './types';
import FullscreenPresentation from './presentations/FullscreenPresentation';
import MiniPresentation from './presentations/MiniPresentation';
import RNVideoPresentation from './presentations/RNVideoPresentation';

export const NowPlayingContext = React.createContext<INowPlaying>({
  nowPlaying: null,
  setNowPlaying: () => null,
  setIsPlaying: () => null,
  setIsFullscreen: () => null,
  isPlaying: false,
  isFullscreen: false,
});

export const PresentationContext = React.createContext<IPresentationComponents>(
  {
    VideoPresentationComponent: FullscreenPresentation,
    MiniPresentationComponent: MiniPresentation,
    FullScreenPresentationComponent: RNVideoPresentation,
  }
);

export const MiniPresentationLayoutContext = React.createContext<
  IMiniPresentationLayout
>({
  width: 0,
  height: 0,
  xOffset: 0,
  yOffset: 0,
});
