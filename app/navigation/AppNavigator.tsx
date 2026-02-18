import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import SampleScreen from '../domain/auth/screens/SampleScreen';
import BottomBar from './BottomBar';
import ProfileScreen from '../domain/profile/Screens/ProfileScreen';
import EditProfile from '../domain/profile/Screens/EditProfile';
import SplashScreen from '../domain/auth/screens/SplashScreen';
import LoginScreen from '../domain/auth/screens/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SampleScreen" component={SampleScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
