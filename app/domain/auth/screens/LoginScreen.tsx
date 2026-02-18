import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import AntDesign from '@react-native-vector-icons/ant-design';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { loginAction } from '../store/async-actions/AuthAsyncActions';
import { setToastMessage } from '../../../store/common-reducer/ToastReducer';
import { AppNavConstants } from '../../../constants/NavConstants';
import { setAuthorization, setTenantId } from '../../../config/AxiosConfig';
import { getProfileAction } from '../../profile/store/async-actions/ProfileAsyncActions';
import { RootState } from '../../../store/storeConfig';
import { imagePaths } from '../../../constants/imagePaths';
import InputText from '../../../components/inputText/InputText';
import { Colors } from '../../../constants/ColorConstants';
import Button from '../../../components/Button';
import { FontType } from '../../../constants/FontType';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const auth = useAppSelector((state: RootState) => state.auth);
  const tenantId = useAppSelector((state: RootState) => state.auth.TenantID);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    const state = await NetInfo.fetch();
    if (!state?.isConnected) {
      Alert.alert('Error', 'No internet connection', [{ text: 'OK' }]);
      return;
    }

    const validationErrors: { [key: string]: string } = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\S]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      const response = await dispatch(
        loginAction({ username: email, password }),
      );

      if (
        response?.meta?.requestStatus == 'fulfilled' &&
        !response?.payload?.error
      ) {
        dispatch(
          setToastMessage({ message: 'Login Successful', type: 'success' }),
        );
        setAuthorization(response?.payload?.loginData?.access_token);
        const profileData = await dispatch(getProfileAction());

        navigation.replace(AppNavConstants.HOME);
      } else {
        dispatch(
          setToastMessage({
            message: response?.payload?.message,
            type: 'error',
          }),
        );
      }
      setIsLoading(false);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    setEmail('ajay.pargaonkar+patient@thinkitive.com');
    setPassword('Pass@123');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={imagePaths.LOGO}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <InputText
          label="Email"
          placeholder="Enter Your Email"
          leftIcon={<Feather name="mail" size={18} color={Colors.iconColor} />}
          value={email}
          onChangeText={setEmail}
        />
        
        <InputText label='Password' placeholder='Enter Your Password' secureTextEntry  value={password} onChangeText={setPassword}/>

        <InputText label='Practice Code' placeholder='Enter Practice Code' value={tenantId} onChangeText={setTenantId}/>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        
        <Button text='Next' onPress={handleLogin} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A9CB0',
    marginRight: 6,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A9CB0',
  },

  langContainer: {
    width: 100,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E8EEF1',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },

  langButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  langText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7A8A91',
  },

  activeLangText: {
    color: '#1A9CB0',
  },

  activeIndicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#D0E6EC',
    borderRadius: 12,
    left: 0,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#3C4A50',
    fontWeight: '500',
  },

  logoImage: {
    width: 140,
    height: 40,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D6DEE2',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },

  forgotText: {
    textAlign: 'right',
    color: '#1A9CB0',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontFamily:FontType.Roboto_Medium
  },

  disabledButton: {
    height: 50,
    backgroundColor: '#006D8F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
