import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  Video,
  PortalOrigin,
  PortalDestination,
} from 'react-native-apollos-player';

export default function App() {
  const [result, setResult] = React.useState<number>(0);
  const video = React.useRef(null);
  const videoProgress = React.useRef(0);

  const pressHandler = () => {
    setResult(result + 1);
  };

  let destination: string;
  switch (result % 3) {
    case 2:
      destination = 'two';
      break;
    case 1:
      destination = 'one';
      break;
    case 0:
    default:
      destination = '';
      break;
  }

  return (
    <View style={styles.container}>
      <Button onPress={pressHandler} title="Move" />

      <PortalOrigin destination={destination}>
        <View>
          <Video
            ref={video}
            style={{ width: 100, height: 100 * (9 / 16) }} // eslint-disable-line react-native/no-inline-styles
            source={require('./Players/broadchurch.mp4')}
            paused={false}
            muted={true}
            repeat={true}
            useTextureView={false}
            hideShutterView
            resizeMode="cover"
            playInBackground
            playWhenInactive
            onProgress={({ currentTime }) => {
              videoProgress.current = currentTime;
            }}
          />
        </View>
      </PortalOrigin>

      {/* Parent A */}
      <View>
        <Text>Parent One</Text>
        <PortalDestination name="one" />
      </View>
      {/* Parent B */}
      <View>
        <Text>Parent Two</Text>
        <PortalDestination name="two" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
