import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
  PanResponder,
} from 'react-native';

import {
  PresentationContext,
  MiniPresentationLayoutContext,
  NowPlayingContext,
} from './context';

const FullscreenSlidingPlayer: React.FunctionComponent = () => {
  const {
    VideoPresentationComponent,
    MiniPresentationComponent,
    FullScreenPresentationComponent,
  } = React.useContext(PresentationContext);

  const fullscreenAnimation = React.useRef(new Animated.Value(0)).current;
  const dragOffset = React.useRef(new Animated.Value(0)).current;
  const fullscreenHeightRef = React.useRef(Dimensions.get('window').height);
  const fullScreenWithOffset = React.useRef(
    Animated.add(fullscreenAnimation, dragOffset)
  ).current;

  const miniLayout = React.useContext(MiniPresentationLayoutContext);

  const { isFullscreen, setIsFullscreen } = React.useContext(NowPlayingContext);

  Animated.spring(fullscreenAnimation, {
    toValue: isFullscreen ? 1 : 0,
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
      opacity: fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [
        {
          translateX: fullscreenAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, miniLayout.width + miniLayout.xOffset],
          }),
        },
      ],
    }),
    [miniLayout, fullscreenAnimation]
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

  return (
    <React.Fragment>
      <Animated.View
        style={
          isFullscreen ? fullscreenPresentationStyles : miniPresentationStyles
        }
      >
        <VideoPresentationComponent />
      </Animated.View>
      <Animated.View
        onLayout={(e: LayoutChangeEvent) => {
          fullscreenHeightRef.current = e?.nativeEvent?.layout?.height;
        }}
        style={fullscreenPresentationStyles}
        {...fullscreenPanResponder.panHandlers}
      >
        <FullScreenPresentationComponent />
      </Animated.View>
      <Animated.View style={miniPresentationStyles}>
        <MiniPresentationComponent />
      </Animated.View>
    </React.Fragment>
  );
};

export default FullscreenSlidingPlayer;
