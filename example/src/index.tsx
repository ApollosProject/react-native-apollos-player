import 'react-native-gesture-handler';
import * as React from 'react';
import TestOne from './Players/TestOne';
import Modal from './Players/Modal';
import { ApollosPlayerContainer } from 'react-native-apollos-player';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ThemeProvider } from '@apollosproject/ui-kit/src/theme';
import Reparenting from './Reparenting';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
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
              component={Modal}
              options={{ stackPresentation: 'modal' }}
            />
            <Stack.Screen
              name="FullScreenModal"
              component={Modal}
              options={{ stackPresentation: 'fullScreenModal' }}
            />
            <Stack.Screen
              name="FormSheet"
              component={Modal}
              options={{ stackPresentation: 'formSheet' }}
            />
          </Stack.Navigator>
        </ApollosPlayerContainer>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
