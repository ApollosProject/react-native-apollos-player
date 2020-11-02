import * as React from 'react';

import { StyleSheet } from 'react-native';
import { PresentationContext, InternalPlayerContext } from './context';
import { PortalOrigin } from './portals';

const VideoPresentationContainer = () => {
  const { VideoComponent } = React.useContext(PresentationContext);
  const { playerId } = React.useContext(InternalPlayerContext);

  if (!VideoComponent) return null;

  return (
    <PortalOrigin destination={playerId} style={StyleSheet.absoluteFill}>
      <VideoComponent />
    </PortalOrigin>
  );
};

export default VideoPresentationContainer;
