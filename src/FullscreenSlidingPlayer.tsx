import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Platform,
  Modal,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';

import { PresentationContext, NowPlayingContext } from './context';

import VideoPresentationContainer from './VideoPresentationContainer';

import VideoOutlet from './VideoOutlet';

interface FullScreenSlidingPlayerProps {}

const FullscreenSlidingPlayer: React.FunctionComponent<FullScreenSlidingPlayerProps> = ({
  children,
}) => {
  const { MiniPresentationComponent } = React.useContext(PresentationContext);

  const [layout, setLayout] = React.useState({
    x: 0,
    y: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // TODO: calculate these some other way
  const collapsedVideoHeight = layout.width * (9 / 16);
  const expandedVideoHeight = layout.width;

  console.log({ layout, collapsedVideoHeight, expandedVideoHeight });

  // Tracks the opening/closing animation. Since we use a <Modal> on iOS,
  // ths is effectively only really used fully on Android
  // (although the animation is still triggered on iOS to KISS).
  const fullscreenAnimation = React.useRef(new Animated.Value(0)).current;

  const scrollOffsetY = React.useRef(new Animated.Value(0)).current;

  const { isFullscreen } = React.useContext(NowPlayingContext);

  Animated.spring(fullscreenAnimation, {
    toValue: isFullscreen ? 1 : 0,
    useNativeDriver: true,
  }).start();

  const fullscreenPresentationStyles = React.useMemo(
    () => ({
      ...StyleSheet.absoluteFillObject,
      zIndex: 99999,
    }),
    []
  );

  const startingInputRange =
    Platform.OS === 'ios' ? -(expandedVideoHeight - collapsedVideoHeight) : 0;

  const miniPresentationStyles = React.useMemo(
    () => ({
      width: '100%',
      height: scrollOffsetY.interpolate({
        inputRange: [
          startingInputRange,
          startingInputRange + expandedVideoHeight - collapsedVideoHeight,
        ],
        outputRange: [expandedVideoHeight, collapsedVideoHeight],
        extrapolate: 'clamp',
      }),
    }),
    [
      startingInputRange,
      scrollOffsetY,
      expandedVideoHeight,
      collapsedVideoHeight,
    ]
  );

  const scrollViewStyles = React.useMemo(
    () => [StyleSheet.absoluteFill, { top: collapsedVideoHeight }],
    [collapsedVideoHeight]
  );

  let FullscreenWrapper = React.useMemo(() => {
    // We have to wrap fullscreen view in <Modal> on iOS in order to make sure
    // the player is presented on top of ReactNavigation Native Navigation views
    if (Platform.OS !== 'ios') return () => null;
    const Wrapper: React.FunctionComponent = (props) => (
      <Modal
        animationType="none"
        presentationStyle="overFullScreen"
        hardwareAccelerated
        transparent
        visible={isFullscreen}
        supportedOrientations={[
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        {...props}
      />
    );
    return Wrapper;
  }, [isFullscreen]);

  return (
    <View
      style={StyleSheet.absoluteFill}
      onLayout={({ nativeEvent: { layout: _layout } }) => setLayout(_layout)}
    >
      <ScrollView
        scrollEventThrottle={16}
        style={scrollViewStyles}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollOffsetY } },
          },
        ])}
        contentInset={{ top: expandedVideoHeight - collapsedVideoHeight }}
        contentOffset={{
          x: 0,
          y: -(expandedVideoHeight - collapsedVideoHeight),
        }}
      >
        {/* Only iOS supports contentInset and offset above */}
        {Platform.OS !== 'ios' ? (
          <View
            style={{ height: expandedVideoHeight - collapsedVideoHeight }}
          />
        ) : null}
        {children}
      </ScrollView>

      {/* Root-Level Video View */}
      <Animated.View
        style={
          isFullscreen ? fullscreenPresentationStyles : miniPresentationStyles
        }
      >
        <VideoPresentationContainer />
        {MiniPresentationComponent ? <MiniPresentationComponent /> : null}
      </Animated.View>

      {/* FullScreen controls */}
      <FullscreenWrapper>
        <Animated.View style={fullscreenPresentationStyles}>
          {isFullscreen ? <VideoOutlet /> : null}
          {MiniPresentationComponent ? <MiniPresentationComponent /> : null}
        </Animated.View>
      </FullscreenWrapper>
    </View>
  );
};

export default FullscreenSlidingPlayer;
