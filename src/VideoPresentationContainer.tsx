import * as React from 'react';

import { StyleSheet } from 'react-native';
import { PresentationContext, NowPlayingContext } from './context';
import { PortalOrigin } from './portals';

const VideoPresentationContainer = () => {
  const { VideoPresentationComponent } = React.useContext(PresentationContext);
  const { playerId } = React.useContext(NowPlayingContext);

  if (!VideoPresentationComponent) return null;
  return (
    <PortalOrigin destination={playerId} style={StyleSheet.absoluteFill}>
      <VideoPresentationComponent />
    </PortalOrigin>
  );
};

export default VideoPresentationContainer;
