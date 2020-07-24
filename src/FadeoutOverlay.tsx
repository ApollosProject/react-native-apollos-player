import * as React from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { styled } from '@apollosproject/ui-kit';
import Color from 'color';
import usePlayer from './usePlayer';
import { InternalPlayerContext } from './context';

const FadeoutOverlay: React.FunctionComponent<{
  style?: any;
  fadeTimeoutMs?: number;
  onPress?: (props: { isVisible: boolean }) => void;
}> = ({ children, fadeTimeoutMs = 5000, style, ...other }) => {
  const { isPlaying } = usePlayer();
  const { isControlVisibilityLocked } = React.useContext(InternalPlayerContext);

  const [isPressing, setIsPressing] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(
    !isPlaying || isControlVisibilityLocked
  );

  const shouldBeVisible = !isPlaying || isVisible || isControlVisibilityLocked;

  const fadeAnimation = React.useRef(
    new Animated.Value(shouldBeVisible ? 1 : 0)
  ).current;

  const handlePressIn = () => {
    setIsVisible(!isVisible);
    setIsPressing(true);
  };

  const handlePressOut = () => {
    setIsPressing(false);
  };

  React.useEffect(() => {
    Animated.spring(fadeAnimation, {
      toValue: shouldBeVisible ? 1 : 0,
      useNativeDriver: true,
    }).start();

    let timeout: ReturnType<typeof setTimeout>;
    if (!isPressing) {
      timeout = setTimeout(() => setIsVisible(false), fadeTimeoutMs);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    isPressing,
    isPlaying,
    isVisible,
    isControlVisibilityLocked,
    fadeAnimation,
    fadeTimeoutMs,
    shouldBeVisible,
  ]);

  return (
    <Animated.View style={[{ opacity: fadeAnimation }, style]} {...other}>
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      {children}
    </Animated.View>
  );
};

const StyledFadeoutOverlay = styled(({ theme }: any) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: Color(theme?.colors?.background?.screen)
    .alpha(theme?.alpha?.low)
    .string(),
}))(FadeoutOverlay);

export default StyledFadeoutOverlay;
