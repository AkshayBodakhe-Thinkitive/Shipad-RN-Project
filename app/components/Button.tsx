import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactNode } from 'react';
import { FontType } from '../constants/FontType';

interface props {
  text?: string;
  onPress?: () => void;
  isLoading?: boolean;
  icon?: ReactNode;
}

const Button = ({ onPress, isLoading, text, icon }: props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>
          {icon}
          {"  "}
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#006D8F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:FontType.Roboto_Bold
  },
});
