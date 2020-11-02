import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Color from 'color';

import {
  ThemeMixin,
  styled,
  ButtonIcon,
  withTheme,
} from '@apollosproject/ui-kit';

import usePlayer from '../usePlayer';
import FadeoutOverlay from '../FadeoutOverlay';

export interface MiniPresentationProps {}

const MiniFadeoutOverlay = styled({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
})(FadeoutOverlay);

const StyledButtonIcon = withTheme(({ theme }: any) => ({
  fill: theme?.colors?.white,
  style: {
    marginTop: '50%',
    marginHorizontal: theme.sizing.baseUnit / 2,
    padding: theme.sizing.baseUnit / 1.5,
    backgroundColor: Color(theme?.colors?.darkSecondary).fade(0.3),
  },
}))(ButtonIcon);

const BadgeContainer = styled(
  ({ iconSize, theme }: any) => ({
    position: 'absolute',
    top: iconSize / 1.5 || theme?.sizing?.baseUnit,
    left: iconSize / 1.5 || theme?.sizing?.baseUnit,
  }),
  'ApollosPlayer.MiniPresentation.FullscreenButtonContainer'
)(View);

const MiniPresentation: React.FunctionComponent<MiniPresentationProps> = () => {
  const {
    setIsFullscreen,
    isFullscreen,
    isPlaying,
    setIsPlaying,
    nowPlaying,
    reset,
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
      >
        <StyledButtonIcon
          onPress={() => setIsFullscreen(!isFullscreen)}
          name={'fullscreen'}
          size={iconSize}
        />
        <StyledButtonIcon
          onPress={() => setIsPlaying(!isPlaying)}
          name={isPlaying ? 'pause' : 'play'}
          size={iconSize}
        />
        <StyledButtonIcon onPress={reset} name={'close'} size={iconSize} />

        <BadgeContainer iconSize={iconSize}>
          {nowPlaying?.presentationProps?.badge}
        </BadgeContainer>
      </MiniFadeoutOverlay>
    </ThemeMixin>
  );
};

export default MiniPresentation;
