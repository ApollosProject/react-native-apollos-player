import type { FunctionComponent } from 'react';
import type { MiniPresentationProps } from './presentations/MiniPresentation';

export interface IPlayerMedia {
  /** Media Source to play. Passed unaltered to underyling Video component */
  source?: number | { uri?: string | undefined };
  /** Image to display while loading */
  coverImage?: number | { uri: string } | [{ uri: string }];

  /** props intended to be used by Presentation Components */
  presentationProps?:
    | any // so you can roll your own presentation components!
    | {
        /** Title to display above video */
        title?: string;
        /** Description to display above video */
        description?: string;
        /** "Badge" to render in the corner of the video. Ex: live badge */
        badge?: JSX.Element;
      };
}

export interface INowPlaying {
  /** Currently playing media */
  nowPlaying: IPlayerMedia | null;
  /** Play / Pause state */
  isPlaying: boolean;
  /** Whether to present fullscreen presentation */
  isFullscreen: boolean;

  seek: (seekTo: number) => void;
  skip: (skipBy: number) => void;

  setNowPlaying: (props: IPlayerMedia) => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: (props: any) => void;
}

export interface IProgressProp {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

export interface IInternalPlayer {
  playerId: string;
  setPlayerId: React.Dispatch<React.SetStateAction<string>>;
  setSeekHandler: React.Dispatch<
    React.SetStateAction<(seekTo: number) => void>
  >;
  setSkipHandler: React.Dispatch<
    React.SetStateAction<(seekBy: number) => void>
  >;
  setIsControlVisibilityLocked: React.Dispatch<React.SetStateAction<boolean>>;
  isControlVisibilityLocked: boolean;
  onProgress: (handlerToAdd: (props: IProgressProp) => void) => () => void;
  handleProgress: (props: IProgressProp) => void;
  isInPiP: boolean;
  setIsInPiP: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPresentationComponents {
  /** Component that renders the actual video. Default: react-native-video */
  VideoPresentationComponent?: FunctionComponent;
  /** Component that is displayed above the video when in mini view */
  MiniPresentationComponent?: FunctionComponent<MiniPresentationProps>;
  /** Component that is displayed above the video when fullscreen */
  FullScreenPresentationComponent?: FunctionComponent;
}

export interface IMiniPresentationLayout {
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}
