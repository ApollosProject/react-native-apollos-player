export interface IPlayerMedia {
  source: number | { uri?: string | undefined };
  title?: string;
  description?: string;
  coverImage?: number | { uri: string } | [{ uri: string }];
}

export interface INowPlaying {
  nowPlaying: IPlayerMedia | null;
  setNowPlaying: React.Dispatch<React.SetStateAction<IPlayerMedia | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPresentationComponents {
  // todo - document the props passed to these functions
  VideoPresentationComponent(props: any): JSX.Element;
  MiniPresentationComponent(props: any): JSX.Element;
  FullScreenPresentationComponent(props: any): JSX.Element;
}

export interface IMiniPresentationLayout {
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}
