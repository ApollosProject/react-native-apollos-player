import * as React from 'react';
import { Text, Button } from 'react-native';
import { ThemeMixin } from '@apollosproject/ui-kit';

import FadeoutOverlay from '../FadeoutOverlay';
import usePlayer from '../usePlayer';

const FullscreenPresentation = () => {
  const {
    setIsFullscreen,
    isFullscreen,
    isPlaying,
    setIsPlaying,
    reset,
    skip,
    seek,
  } = usePlayer();

  return (
    <ThemeMixin mixin={{ type: 'dark' }}>
      <FadeoutOverlay>
        <Text>FullscreenPresentation{'\n\n'}</Text>
        <Button
          onPress={() => setIsFullscreen(!isFullscreen)}
          title="Go Minimized"
        />
        <Button onPress={reset} title="Close media" />
        <Button
          onPress={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Pause' : 'Play'}
        />
        <Button onPress={() => skip(-5)} title={'Skip back'} />
        <Button onPress={() => skip(5)} title={'Skip forward'} />
        <Button onPress={() => seek(0)} title={'Seek to beginning'} />
      </FadeoutOverlay>
    </ThemeMixin>
  );
};

export default FullscreenPresentation;
