import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './app/navigation/AppNavigator'
import Toast from './app/components/toast/Toast'

const App = () => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <StatusBar
      translucent
      backgroundColor='transparent'
      barStyle='dark-content'
       />
       <AppNavigator />
       <Toast />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})