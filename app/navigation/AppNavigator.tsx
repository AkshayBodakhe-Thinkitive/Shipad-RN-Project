import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import SampleScreen from '../domain/auth/screens/SampleScreen'
import BottomBar from './BottomBar'
import ProfileScreen from '../domain/profile/Screens/ProfileScreen'
import EditProfile from '../domain/profile/Screens/EditProfile'


const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='AuthNavigation' component={AuthNavigation}/>
            <Stack.Screen name='BottomBar' component={BottomBar}/>
            <Stack.Screen name='SampleScreen' component={SampleScreen}/>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='EditProfile' component={EditProfile} />

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})