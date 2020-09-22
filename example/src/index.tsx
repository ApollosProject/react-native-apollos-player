import 'react-native-gesture-handler';
import * as React from 'react';
import TestOne from './Players/TestOne';
import Modal from './Players/Modal';
import { ApollosPlayerContainer } from 'react-native-apollos-player';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ThemeProvider } from '@apollosproject/ui-kit/src/theme';
import { ThemeMixin } from '@apollosproject/ui-kit';
import VideoTests from './VideoTests';
import Reparenting from './Reparenting';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <ThemeMixin
        mixin={{
          typography: {
            sans: {
              regular: {
                default: 'System',
                italic: 'System',
              },
              medium: {
                default: 'System',
                italic: 'System',
              },
              bold: {
                default: 'System',
                italic: 'System',
              },
              black: {
                default: 'System',
                italic: 'System',
              },
            },
            serif: {
              regular: {
                default: 'System',
                italic: 'System',
              },
              bold: {
                default: 'System',
                italic: 'System',
              },
            },
            ui: {
              regular: 'System',
            },
          },
        }}
      >
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
                name="VideoTests"
                component={VideoTests}
                options={{ stackPresentation: 'push' }}
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
      </ThemeMixin>
    </ThemeProvider>
  );
};

export default App;
