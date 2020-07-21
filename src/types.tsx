import type { FunctionComponent } from 'react';
import type { MiniPresentationProps } from './presentations/MiniPresentation';

export interface IPlayerMedia {
  source?: number | { uri?: string | undefined };
  title?: string;
  description?: string;
  coverImage?: number | { uri: string } | [{ uri: string }];
}

export interface INowPlaying {
  nowPlaying: IPlayerMedia | null;
  setNowPlaying: (props: IPlayerMedia) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  playerId: string;
  setPlayerId: React.Dispatch<React.SetStateAction<string>>;
  reset: (props: any) => void;
}

export interface IPresentationComponents {
  // todo - document the props passed to these functions
  VideoPresentationComponent?: FunctionComponent;
  MiniPresentationComponent?: FunctionComponent<MiniPresentationProps>;
  FullScreenPresentationComponent?: FunctionComponent;
}

export interface IMiniPresentationLayout {
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}
