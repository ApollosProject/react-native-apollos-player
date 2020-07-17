import 'react-native-gesture-handler';
import * as React from 'react';
import TestOne from './Players/TestOne';
import { ApollosPlayerContainer } from 'react-native-apollos-player';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Reparenting from './Reparenting';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ApollosPlayerContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TestOne} />
          <Stack.Screen name="Reparenting" component={Reparenting} />
          <Stack.Screen
            name="Push"
            component={TestOne}
            options={{ stackPresentation: 'push' }}
          />
          <Stack.Screen
            name="Modal"
            component={TestOne}
            options={{ stackPresentation: 'modal' }}
          />
          <Stack.Screen
            name="FullScreenModal"
            component={TestOne}
            options={{ stackPresentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="FormSheet"
            component={TestOne}
            options={{ stackPresentation: 'formSheet' }}
          />
        </Stack.Navigator>
      </ApollosPlayerContainer>
    </NavigationContainer>
  );
};

export default App;
