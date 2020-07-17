import * as React from 'react';
import { requireNativeComponent } from 'react-native';

interface PortalOriginProps {
  destination: string | null;
  children: any;
}

interface PortalDestinationProps {
  name: string;
}

const PortalOrigin = (props: PortalOriginProps) => (
  <RCTPortalOrigin {...props} />
);

const PortalDestination = (props: PortalDestinationProps) => (
  <RCTPortalDestination {...props} />
);

const RCTPortalOrigin = requireNativeComponent('RCTPortalOrigin');
const RCTPortalDestination = requireNativeComponent('RCTPortalDestination');

export { PortalOrigin, PortalDestination };
