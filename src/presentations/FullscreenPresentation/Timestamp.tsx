import * as React from 'react';
import { View } from 'react-native';

import { H6, styled } from '@apollosproject/ui-kit';
import { InternalPlayerContext } from '../../context';

const TimeText = styled(
  {
    textAlign: 'center',
    alignItems: 'center',
  },
  'ui-media.MediaPlayer.Seeker.Timestamp.TimeText'
)(H6);

const Container = styled(
  {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'ui-media.MediaPlayer.Seeker.Container'
)(View);

const formattedTimestamp = (time = 0) => {
  // Hours, minutes and seconds
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  let timestamp = '';

  if (hrs > 0) {
    timestamp += `${hrs}:${mins < 10 ? '0' : ''}`;
  }

  timestamp += `${mins}:${Math.round(secs) < 10 ? '0' : ''}`;
  timestamp += `${Math.round(secs)}`;
  return timestamp;
};

/**
 * Displays a MM:SS formatted timestamp from either a number or Animate.Value in seconds
 */
const TimeStamp: React.FunctionComponent = () => {
  const [time, setCurrentTime] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0);

  const { onProgress } = React.useContext(InternalPlayerContext);

  React.useEffect(
    () =>
      onProgress(({ currentTime, playableDuration }) => {
        setCurrentTime(currentTime);
        setTotalTime(playableDuration);
      }),
    [onProgress, setTotalTime, setCurrentTime]
  );

  return (
    <Container>
      <TimeText>{formattedTimestamp(time)}</TimeText>
      <TimeText>{formattedTimestamp(totalTime)}</TimeText>
    </Container>
  );
};

export default TimeStamp;
