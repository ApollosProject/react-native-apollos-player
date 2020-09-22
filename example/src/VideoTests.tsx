import * as React from 'react';
import Video from 'react-native-video';

import { Button } from 'react-native';

const VideoTests = () => {
  const [pictureInPicture, setPictureInPicture] = React.useState(false);
  const videoRef = React.useRef<Video>(null);

  return (
    <>
      <Video
        ref={videoRef}
        source={require('./Players/broadchurch.mp4')}
        style={{ width: '100%', aspectRatio: 1 }} // eslint-disable-line react-native/no-inline-styles
        ignoreSilentSwitch="ignore"
        pictureInPicture={pictureInPicture}
      />
      <Button
        title="Toggle pictureInPicture"
        onPress={() => setPictureInPicture(!pictureInPicture)}
      />
      <Button
        title="Go fullscreen"
        onPress={() => videoRef.current?.presentFullscreenPlayer()}
      />
    </>
  );
};

export default VideoTests;
