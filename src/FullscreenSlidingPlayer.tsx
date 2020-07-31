import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
  PanResponder,
  Platform,
  Modal,
} from 'react-native';

import {
  PresentationContext,
  MiniPresentationLayoutContext,
  NowPlayingContext,
} from './context';

import VideoPresentationContainer from './VideoPresentationContainer';

import VideoOutlet from './VideoOutlet';

interface FullScreenSlidingPlayerProps {
  /**
   * Whether to treat as the "master" (root-level) player object.
   * When true, a <VideoPresentationContainer /> will be mounted.
   * This is important as the native-side portal code needs something to
   * treat as the base node to "portal" everywhere else.
   */
  isMasterPlayer?: boolean;
}
const FullscreenSlidingPlayer: React.FunctionComponent<FullScreenSlidingPlayerProps> = ({
  isMasterPlayer = false,
}) => {
  const {
    MiniPresentationComponent,
    FullScreenPresentationComponent,
  } = React.useContext(PresentationContext);

  // Tracks the opening/closing animation. Since we use a <Modal> on iOS,
  // ths is effectively only really used fully on Android
  // (although the animation is still triggered on iOS to KISS).
  const fullscreenAnimation = React.useRef(new Animated.Value(0)).current;

  // Tracks the sliding animation the mini-player makes when it opens / closes
  const noMediaAnimation = React.useRef(new Animated.Value(1)).current;

  // Tracks the user dragging the fullscreen player down
  const fullscreenDragOffset = React.useRef(new Animated.Value(0)).current;

  // Tracks the user dragging the mini player around
  const miniDragOffset = React.useRef([
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // This is set as a Ref since it is mutated (onLayout call below)
  const fullscreenHeightRef = React.useRef(Dimensions.get('window').height);

  // Used to render position of the fullscreen slider
  const fullScreenWithOffset = React.useRef(
    Animated.add(fullscreenAnimation, fullscreenDragOffset)
  ).current;

  // Used to render position of the mini player
  const fullscreenWithNoMediaAnimation = React.useRef(
    Animated.add(fullscreenAnimation, noMediaAnimation)
  ).current;

  const miniLayout = React.useContext(MiniPresentationLayoutContext);

  const { nowPlaying, isFullscreen, setIsFullscreen } = React.useContext(
    NowPlayingContext
  );

  Animated.spring(fullscreenAnimation, {
    toValue: isFullscreen ? 1 : 0,
    useNativeDriver: true,
  }).start();

  Animated.spring(noMediaAnimation, {
    toValue: nowPlaying?.source ? 0 : 1,
    useNativeDriver: true,
  }).start();

  const fullscreenPresentationStyles = React.useMemo(
    () => [
      StyleSheet.absoluteFill,
      {
        zIndex: 9999, // 🎉
        opacity: fullScreenWithOffset.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateY: fullScreenWithOffset.interpolate({
              inputRange: [0, 1],
              outputRange: [fullscreenHeightRef.current, 0],
            }),
          },
        ],
      },
    ],
    [fullScreenWithOffset]
  );

  const miniPresentationStyles = React.useMemo(
    () => ({
      zIndex: 9999, // 🎉
      position: 'absolute',
      right: miniLayout.xOffset,
      bottom: miniLayout.yOffset,
      width: miniLayout.width,
      height: miniLayout.height,
      opacity: fullscreenWithNoMediaAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [
        {
          translateX: fullscreenWithNoMediaAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, miniLayout.width + miniLayout.xOffset],
          }),
        },
        {
          translateX: miniDragOffset[0],
        },
        {
          translateY: miniDragOffset[1],
        },
      ],
    }),
    [miniLayout, fullscreenWithNoMediaAnimation, miniDragOffset]
  );

  const fullscreenPanResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx, dy }) =>
          // set pan responder only when we move enough in the Y-axis
          Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10,

        onPanResponderMove: (_, { dy }) => {
          // Calculate the amount you've offsetted the cover
          const _dragOffset = Math.min(0, -dy / fullscreenHeightRef.current);
          fullscreenDragOffset.setValue(_dragOffset);
        },

        onPanResponderRelease: (_, { dy, vy }) => {
          const gestureVelocity = vy;
          const gestureDistance = Math.abs(dy);

          // Determine whether to continue the animation and exit fullscreen,
          // or stay full screen and reset back up
          let _isFullscreen = true;
          if (Math.abs(gestureVelocity) > 0.5) {
            // ^^ the user is dragging fast!
            if (gestureVelocity > 0) {
              // ^^ but in the wrong direction!
              _isFullscreen = false;
            }
          } else if (gestureDistance >= fullscreenHeightRef.current / 2) {
            // ^^ not dragging fast, but has dragged atleast half-way
            _isFullscreen = false;
          }

          if (_isFullscreen) {
            Animated.spring(fullscreenDragOffset, {
              toValue: 0,
              useNativeDriver: true,
            }).start(() => fullscreenDragOffset.setValue(0));
          } else {
            fullscreenDragOffset.setValue(0);
          }

          setIsFullscreen(_isFullscreen);
        },
      }),
    [fullscreenDragOffset, setIsFullscreen]
  );

  const miniPanResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx, dy }) =>
          // set pan responder only when we move enough in either Y-axis
          Math.abs(dy) > 10 || Math.abs(dx) > 10,

        onPanResponderMove: (_, { dy, dx }) => {
          // Dividing by two to create some friction
          miniDragOffset[0].setValue(dx / 2);
          miniDragOffset[1].setValue(dy / 2);
        },

        onPanResponderRelease: () => {
          Animated.spring(miniDragOffset[0], {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          Animated.spring(miniDragOffset[1], {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        },
      }),
    [miniDragOffset]
  );

  let FullscreenWrapper = React.useMemo(() => {
    // We have to wrap fullscreen view in <Modal> on iOS in order to make sure
    // the player is presented on top of ReactNavigation Native Navigation views
    if (Platform.OS !== 'ios') return React.Fragment;
    const Wrapper: React.FunctionComponent = (props) => (
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        hardwareAccelerated
        transparent
        visible={isFullscreen}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
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
    <React.Fragment>
      {/* Video View */}
      {isMasterPlayer ? (
        <Animated.View
          style={
            isFullscreen ? fullscreenPresentationStyles : miniPresentationStyles
          }
        >
          <VideoPresentationContainer />
        </Animated.View>
      ) : null}

      {/* FullScreen controls */}
      <FullscreenWrapper>
        <Animated.View
          onLayout={(e: LayoutChangeEvent) => {
            fullscreenHeightRef.current = e?.nativeEvent?.layout?.height;
          }}
          style={fullscreenPresentationStyles}
          {...fullscreenPanResponder.panHandlers}
        >
          {isFullscreen ? <VideoOutlet /> : null}
          {FullScreenPresentationComponent ? (
            <FullScreenPresentationComponent />
          ) : null}
        </Animated.View>
      </FullscreenWrapper>

      {/* Mini controls */}
      <Animated.View
        style={miniPresentationStyles}
        {...miniPanResponder.panHandlers}
      >
        {!isMasterPlayer && !isFullscreen ? <VideoOutlet /> : null}
        {MiniPresentationComponent ? <MiniPresentationComponent /> : null}
      </Animated.View>
    </React.Fragment>
  );
};

export default FullscreenSlidingPlayer;
