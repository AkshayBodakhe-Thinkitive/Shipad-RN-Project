import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({color}:props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <Feather name="arrow-left" size={25} color={color ? color : "#333"} />
    </TouchableOpacity>
  );
};

export default BackButton;

interface props{
  color?:string
  padding? : number
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 16,
    marginTop: 10,
    padding:4,
  },
})
