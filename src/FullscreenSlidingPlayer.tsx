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

const usePortal = Platform.OS === 'ios';

import {
  PresentationContext,
  MiniPresentationLayoutContext,
  NowPlayingContext,
} from './context';

import VideoPresentationContainer from './VideoPresentationContainer';
import { PortalDestination } from './portals';

const FullscreenSlidingPlayer: React.FunctionComponent = () => {
  const {
    MiniPresentationComponent,
    FullScreenPresentationComponent,
  } = React.useContext(PresentationContext);

  const fullscreenAnimation = React.useRef(new Animated.Value(0)).current;
  const noMediaAnimation = React.useRef(new Animated.Value(1)).current;
  const dragOffset = React.useRef(new Animated.Value(0)).current;
  const fullscreenHeightRef = React.useRef(Dimensions.get('window').height);
  const fullScreenWithOffset = React.useRef(
    Animated.add(fullscreenAnimation, dragOffset)
  ).current;
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
      ],
    }),
    [miniLayout, fullscreenWithNoMediaAnimation]
  );

  const fullscreenPanResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx, dy }) =>
          Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10, // set pan responder only when we move enough in the Y-axis

        onPanResponderMove: (_, { dy }) => {
          // Calculate the amount you've offsetted the cover
          const _dragOffset = Math.min(0, -dy / fullscreenHeightRef.current);
          dragOffset.setValue(_dragOffset);
        },

        onPanResponderRelease: (_, { dy, vy }) => {
          const gestureVelocity = vy;
          const gestureDistance = Math.abs(dy);

          // Determine whether to continue the animation and exit fullscreen,
          // or stay full screen and reset back up
          let _isFullscreen = true;
          if (Math.abs(gestureVelocity) > 0.5) {
            // ^^ fast!
            if (gestureVelocity > 0) {
              // ^^ but in the wrong direction!
              _isFullscreen = false;
            }
          } else if (gestureDistance >= fullscreenHeightRef.current / 2) {
            // ^^ not fast, but has dragged atleast half-way
            _isFullscreen = false;
          }

          Animated.spring(dragOffset, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

          setIsFullscreen(_isFullscreen);
        },
      }),
    [dragOffset, setIsFullscreen]
  );

  let FullscreenWrapper = React.useMemo(() => {
    if (!usePortal && !isFullscreen) return React.Fragment;
    const Wrapper: React.FunctionComponent = (props) => (
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        hardwareAccelerated
        transparent
        visible={isFullscreen}
        {...props}
      />
    );
    return Wrapper;
  }, [isFullscreen]);

  return (
    <React.Fragment>
      {/* Video View */}
      <Animated.View
        style={
          isFullscreen ? fullscreenPresentationStyles : miniPresentationStyles
        }
      >
        <VideoPresentationContainer />
      </Animated.View>

      {/* FullScreen controls */}
      <FullscreenWrapper>
        <Animated.View
          onLayout={(e: LayoutChangeEvent) => {
            fullscreenHeightRef.current = e?.nativeEvent?.layout?.height;
          }}
          style={fullscreenPresentationStyles}
          {...fullscreenPanResponder.panHandlers}
        >
          {usePortal ? <PortalDestination name="fullscreen" /> : null}
          {FullScreenPresentationComponent ? (
            <FullScreenPresentationComponent />
          ) : null}
        </Animated.View>
      </FullscreenWrapper>

      {/* Mini controls */}
      <Animated.View style={miniPresentationStyles}>
        {MiniPresentationComponent ? <MiniPresentationComponent /> : null}
      </Animated.View>
    </React.Fragment>
  );
};

export default FullscreenSlidingPlayer;
