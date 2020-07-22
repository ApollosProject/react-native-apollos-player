import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Color from 'color';

import {
  PaddedView,
  Touchable,
  Icon,
  ThemeMixin,
  styled,
} from '@apollosproject/ui-kit';

import usePlayer from '../usePlayer';

export interface MiniPresentationProps {}

const Container = styled(
  ({ theme }: any) => ({
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme?.sizing?.baseUnit,
    backgroundColor: Color(theme?.colors?.background?.screen)
      .alpha(theme?.alpha?.low)
      .string(),
  }),
  'ApollosPlayer.MiniPresentation.Container'
)(PaddedView);

const PositioningContainer = styled({ width: '100%', height: '100%' })(View);

const FullscreenButtonContainer = styled(
  {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
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
  const { setIsFullscreen, isFullscreen, nowPlaying } = usePlayer();
  const [layoutWidth, setLayoutWidth] = React.useState(
    Dimensions.get('window').width
  );

  let iconSize = 24;
  if (layoutWidth < Dimensions.get('window').width / 2) {
    iconSize = 16;
  }

  return (
    <ThemeMixin mixin={{ type: 'dark' }}>
      <Container
        onLayout={(e: any) => {
          setLayoutWidth(e?.nativeEvent?.layout?.width);
        }}
      >
        <PositioningContainer>
          <FullscreenButtonContainer>
            <Touchable
              hitSlop={{ bottom: 24, left: 24, top: 24, right: 24 }}
              onPress={() => setIsFullscreen(!isFullscreen)}
            >
              <Icon name="fullscreen" size={iconSize} />
            </Touchable>
          </FullscreenButtonContainer>

          <BadgeContainer>
            {nowPlaying?.presentationProps?.badge}
          </BadgeContainer>
        </PositioningContainer>
      </Container>
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
