import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/storeConfig';
import { AppNavConstants, AuthNavConstants } from '../../../constants/NavConstants';
import { imagePaths } from '../../../constants/imagePaths';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  const isLoggedIn = useAppSelector((state:RootState)=>state.auth.isLoggedIn);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 2.5,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
     { isLoggedIn ? navigation.replace(AppNavConstants.HOME) : navigation.replace(AuthNavConstants.LOGIN_SCREEN)} 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.centerContent,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={imagePaths.LOGO} 
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerContent: {
    alignItems: 'center',
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },

  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B2C5F',
  },

  footerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
});