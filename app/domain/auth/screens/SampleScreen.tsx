import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SampleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SampleScreen</Text>
    </View>
  )
}

export default SampleScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  }
})