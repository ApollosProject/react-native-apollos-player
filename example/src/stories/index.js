import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { linkTo } from '@storybook/addon-links';
import { ApollosPlayerContainer } from 'react-native-apollos-player';

import Welcome from './Welcome';
import Reparenting from './Reparenting';
import PlayerTestOne from './Players/TestOne';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Reparenting')} />
));

storiesOf('Reparenting', module).add('Test 1', () => <Reparenting />);

storiesOf('ApollosPlayer', module).add('Test 1', () => (
  <ApollosPlayerContainer>
    <PlayerTestOne />
  </ApollosPlayerContainer>
));
