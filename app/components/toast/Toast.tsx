// Toast.js
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/storeConfig';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from '@react-native-vector-icons/feather';
import { clearToastMessage } from '../../store/common-reducer/ToastReducer';

const Toast = () => {
  const dispatch = useDispatch();
  const {message, type} = useAppSelector((state: RootState) => state.toast);
  const opacity = useRef(new Animated.Value(0)).current;

  const [isOpen, setIsOpen] = useState(!!message);

  useEffect(() => {
    if (message) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch, opacity]);

  const handleClose = () => {
    // Fade out the toast
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false); // Set to closed
      dispatch(clearToastMessage()); // Clear message in Redux state
    });
  };

  if (!message) return null;

  const backgroundColor =
    type === 'error'
      ? 'rgb(245, 73, 73)'
      : type === 'success'
      ? 'green'
      : 'orange';

  return (
    <Animated.View style={[{opacity}, styles.toastContainer]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {type === 'success' ? (
          <Feather
            name="check"
            color={backgroundColor}
            style={{
              marginRight: responsiveWidth(3),
              fontSize: responsiveFontSize(2.5),
            }}
          />
        ) : type === 'error' ? (
          <Feather name='x' color={backgroundColor} style={{
            marginRight: responsiveWidth(3),
            fontSize: responsiveFontSize(2.5),
          }}/>
        ) : (
         <View style={{marginRight: responsiveWidth(2)}}></View>
        )}
        <Text style={[styles.toastText]}>{message}</Text>
        <TouchableOpacity
          onPress={handleClose}
          style={{marginLeft: responsiveWidth(3), padding: 2}}>
          <Feather
            name="x"
            color="white"
            style={{fontSize: responsiveFontSize(2.5)}}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    backgroundColor: '#2F3335',
    bottom: 100,
    alignSelf: 'center',
    padding: responsiveFontSize(0.9),
    paddingHorizontal: responsiveFontSize(1.5),
    borderRadius: 15,
    zIndex: 1000,
    marginHorizontal:responsiveWidth(8),
  },
  toastText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    maxWidth: responsiveWidth(80),
  },
});

export default Toast;
