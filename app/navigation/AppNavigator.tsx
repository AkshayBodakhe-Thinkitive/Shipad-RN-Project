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
import { AppNavConstants, AuthNavConstants } from '../constants/NavConstants';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AppNavConstants.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={AppNavConstants.AUTH_NAVIGATOR} component={AuthNavigation} />
        <Stack.Screen name={AppNavConstants.HOME} component={BottomBar} />
        <Stack.Screen name={AppNavConstants.SAMPLE_SCREEN} component={SampleScreen} />
        <Stack.Screen name={AppNavConstants.PROFILE_SCREEN} component={ProfileScreen} />
        <Stack.Screen name={AppNavConstants.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
