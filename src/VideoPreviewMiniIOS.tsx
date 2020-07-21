import * as React from 'react';
import { Platform } from 'react-native';
import FullscreenSlidingPlayer from './FullscreenSlidingPlayer';

const VideoPreviewMiniIOS: React.FunctionComponent = () => {
  if (Platform.OS !== 'ios') return null;
  return <FullscreenSlidingPlayer />;
};

export default VideoPreviewMiniIOS;
