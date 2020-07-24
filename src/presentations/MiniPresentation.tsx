import * as React from 'react';
import { View, Dimensions } from 'react-native';

import { Touchable, Icon, ThemeMixin, styled } from '@apollosproject/ui-kit';

import usePlayer from '../usePlayer';
import FadeoutOverlay from '../FadeoutOverlay';

export interface MiniPresentationProps {}

const MiniFadeoutOverlay = styled(({ theme }: any) => ({
  borderRadius: theme?.sizing?.baseUnit,
}))(FadeoutOverlay);

const FullscreenButtonContainer = styled(
  ({ iconSize, theme }: any) => ({
    position: 'absolute',
    right: iconSize / 1.5 || theme?.sizing?.baseUnit,
    bottom: iconSize / 1.5 || theme?.sizing?.baseUnit,
  }),
  'ApollosPlayer.MiniPresentation.FullscreenButtonContainer'
)(View);

const PlayPauseButtonContainer = styled(
  ({ iconSize, theme }: any) => ({
    position: 'absolute',
    top: iconSize / 1.5 || theme?.sizing?.baseUnit,
    left: iconSize / 1.5 || theme?.sizing?.baseUnit,
  }),
  'ApollosPlayer.MiniPresentation.FullscreenButtonContainer'
)(View);

const BadgeContainer = styled(
  {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  'ApollosPlayer.MiniPresentation.FullscreenButtonContainer'
)(View);

const MiniPresentation: React.FunctionComponent<MiniPresentationProps> = () => {
  const {
    setIsFullscreen,
    isFullscreen,
    isPlaying,
    setIsPlaying,
    nowPlaying,
  } = usePlayer();
  const [layoutWidth, setLayoutWidth] = React.useState(
    Dimensions.get('window').width
  );

  let iconSize = 24;
  if (layoutWidth < Dimensions.get('window').width / 2) {
    iconSize = 16;
  }

  return (
    <ThemeMixin mixin={{ type: 'dark' }}>
      <MiniFadeoutOverlay
        onLayout={(e: any) => {
          setLayoutWidth(e?.nativeEvent?.layout?.width);
        }}
        onPress={({ isVisible }: { isVisible: boolean }) =>
          isVisible && setIsPlaying(!isPlaying)
        }
      >
        <PlayPauseButtonContainer iconSize={iconSize}>
          <Touchable
            hitSlop={{ bottom: 8, left: 8, top: 8, right: 8 }}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={iconSize} />
          </Touchable>
        </PlayPauseButtonContainer>
        <FullscreenButtonContainer iconSize={iconSize}>
          <Touchable
            hitSlop={{ bottom: 8, left: 8, top: 8, right: 8 }}
            onPress={() => setIsFullscreen(!isFullscreen)}
          >
            <Icon name="fullscreen" size={iconSize} />
          </Touchable>
        </FullscreenButtonContainer>

        <BadgeContainer>{nowPlaying?.presentationProps?.badge}</BadgeContainer>
      </MiniFadeoutOverlay>
    </ThemeMixin>
  );
};

const screen = Dimensions.get('screen');

export const defaultMiniPlayerSize = {
  width: Math.min(screen.width * 0.3, 240),
  height: 0,
  xOffset: 16,
  yOffset: 24,
};

defaultMiniPlayerSize.height = defaultMiniPlayerSize.width * (9 / 16);

export default MiniPresentation;
