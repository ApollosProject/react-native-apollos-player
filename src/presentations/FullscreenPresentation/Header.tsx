import * as React from 'react';
import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import Color from 'color';
import {
  H4,
  BodySmall,
  PaddedView,
  styled,
  ConnectedImage,
  ButtonIcon,
  withTheme,
} from '@apollosproject/ui-kit';

import usePlayer from '../../usePlayer';

const Image = styled(({ theme }: any) => ({
  width: theme?.sizing?.baseUnit * 3.5,
  borderRadius: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit,
  aspectRatio: 1,
}))(ConnectedImage);

const DownButton = withTheme(
  ({ theme }: any) => ({
    fill: theme?.colors?.text?.secondary,
    style: {
      padding: theme?.sizing?.baseUnit / 1.25,
      backgroundColor: Color(theme?.colors?.darkTertiary).fade(0.5),
      borderRadius: 0,
    },
    size: theme?.sizing?.baseUnit,
    name: 'fullscreen',
  }),
  'ui-media.MediaPlayer.FullscreenControls.Header.DownButton'
)(ButtonIcon);

const CloseButton = withTheme(
  ({ theme }: any) => ({
    fill: theme?.colors?.text?.secondary,
    style: {
      padding: theme?.sizing?.baseUnit / 1.25,
      backgroundColor: Color(theme?.colors?.darkTertiary).fade(0.75),
      borderRadius: 0,
    },
    size: theme?.sizing?.baseUnit,
    name: 'close',
  }),
  'ui-media.MediaPlayer.FullscreenControls.Header.DownButton'
)(ButtonIcon);

const DownButtonContainer = styled(({ theme, isLandscape }: any) => ({
  position: 'absolute',
  top: theme?.sizing?.baseUnit,
  right: theme?.sizing?.baseUnit,
  borderRadius: theme?.sizing?.baseUnit / 2,
  overflow: 'hidden',
  flexDirection: isLandscape ? 'row-reverse' : 'column',
}))(View);

const Header: React.FunctionComponent = () => {
  const { nowPlaying, setIsFullscreen, reset } = usePlayer();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <>
      <SafeAreaView>
        <PaddedView>
          {nowPlaying?.presentationProps?.coverImage ? (
            <Image source={nowPlaying.presentationProps.coverImage} />
          ) : null}
          {nowPlaying?.presentationProps?.badge
            ? nowPlaying?.presentationProps?.badge
            : null}
          <H4>{nowPlaying?.presentationProps?.title}</H4>
          <BodySmall>{nowPlaying?.presentationProps?.description}</BodySmall>
        </PaddedView>
      </SafeAreaView>

      <DownButtonContainer isLandscape={isLandscape}>
        <CloseButton onPress={reset} />
        <DownButton onPress={() => setIsFullscreen(false)} />
      </DownButtonContainer>
    </>
  );
};

export default Header;