import * as React from 'react';

import { StyleSheet } from 'react-native';
import { PresentationContext, NowPlayingContext } from './context';
import { PortalOrigin } from './portals';

const VideoPresentationContainer = () => {
  const { VideoPresentationComponent } = React.useContext(PresentationContext);
  const { isFullscreen } = React.useContext(NowPlayingContext);
  if (!VideoPresentationComponent) return null;

  let destination = isFullscreen ? 'fullscreen' : '';

  return (
    <PortalOrigin destination={destination} style={StyleSheet.absoluteFill}>
      <VideoPresentationComponent />
    </PortalOrigin>
  );
};

export default VideoPresentationContainer;
