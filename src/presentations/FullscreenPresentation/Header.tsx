import * as React from 'react';
import { SafeAreaView } from 'react-native';
import {
  H4,
  BodySmall,
  PaddedView,
  styled,
  ConnectedImage,
} from '@apollosproject/ui-kit';

import usePlayer from '../../usePlayer';

const Image = styled(({ theme }: any) => ({
  width: theme?.sizing?.baseUnit * 3.5,
  borderRadius: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit,
  aspectRatio: 1,
}))(ConnectedImage);

const Header: React.FunctionComponent = () => {
  const { nowPlaying } = usePlayer();
  console.log(nowPlaying);
  return (
    <SafeAreaView>
      <PaddedView>
        {nowPlaying?.presentationProps?.coverImage ? (
          <Image source={nowPlaying.presentationProps.coverImage} />
        ) : null}
        <H4>{nowPlaying?.presentationProps?.title}</H4>
        <BodySmall>{nowPlaying?.presentationProps?.description}</BodySmall>
      </PaddedView>
    </SafeAreaView>
  );
};

export default Header;
