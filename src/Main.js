import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Home from './components/Screens/Home';
import Scanner from './components/Screens/Scanner';

const Stack = createStackNavigator();

export default class Main extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Scanner" component={Scanner} />
          </Stack.Navigator>
          {/* <Home /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
