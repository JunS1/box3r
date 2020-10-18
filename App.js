import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './screens/Profile/ProfileScreen'
import BoxScreen from './screens/Box/BoxScreen'
import ScannerScreen from './screens/Scanner/ScannerScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        tabBarOptions={{
          tabStyle: {justifyContent: 'center', alignItems: 'center'}
        }}>
        <Tab.Screen name="Box" component={BoxScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}