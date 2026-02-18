import {
  Text,
  TextInput as RnTextInput,
  TextInputProps as RnTextInputProps,
  View,
  ViewStyle,
  TouchableOpacity,
  KeyboardType,
  StyleProp,
} from 'react-native';
import React, {ReactNode, useState, forwardRef} from 'react';
import {TextInputStyles as styles} from './TextInputStyles';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {Feather} from '@react-native-vector-icons/feather';
import {Colors} from '../../constants/ColorConstants';

const TextInput = forwardRef(
  (
    {
      label,
      placeholder,
      onChangeText,
      secureTextEntry,
      rightIcon,
      leftIcon,
      style,
      value,
      editable,
      keyboardType,
      isValid,
      errorText,
      onFocus,
      onBlur,
      autoCapitalize,
      inputBoxStyles,
      maxLength,
      multiline,
      required,
    }: TextInputProps,
    ref: any,
  ) => {
    const [showPass, setShowPass] = useState(true);

    const onChangeTxt = (val: string) => {
      onChangeText && onChangeText(val);
    };

    return (
      <View style={[styles.container, style]}>
        {label && (
          <Text style={styles.labelStyles}>
            {label} {required && <Text style={{color: 'red'}}>*</Text>}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            isValid && {
              borderColor: Colors.negative50,
              borderWidth: 0.5,
              marginBottom: 0,
            },
            inputBoxStyles,
            editable === false && {backgroundColor: Colors.neutral1},
          ]}>
          <RnTextInput
            ref={ref}
            cursorColor={'grey'}
            maxLength={maxLength}
            textAlignVertical="top"
            style={[
              styles.inputBox,
              leftIcon ? {marginLeft: responsiveWidth(8)} : null,
            ]}
            editable={editable}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.neutral40}
            onChangeText={onChangeTxt}
            secureTextEntry={secureTextEntry ? showPass : false}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            scrollEnabled={multiline}
          />
          <View style={{position: 'absolute', right: 7}}>
            {rightIcon && rightIcon}
          </View>
          <View style={{position: 'absolute', left: responsiveWidth(3)}}>
            {leftIcon && leftIcon}
          </View>
        </View>
        {isValid && errorText && (
          <Text style={styles.errorText}>{errorText}</Text>
        )}
        {secureTextEntry === true && (
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass);
            }}
            style={styles.eye}>
            <Feather
              name={!showPass ? 'eye' : 'eye-off'}
              color={Colors.neutral70}
              size={responsiveFontSize(3.2)}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default TextInput;

export interface TextInputProps {
  ref?: any;
  label?: string;
  value?: string | any;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputBoxStyles?: StyleProp<ViewStyle>;
  editable?: boolean;
  keyboardType?: KeyboardType;
  isValid?: boolean | any;
  errorText?: string;
  onBlur?: RnTextInputProps['onBlur'];
  onFocus?: RnTextInputProps['onFocus'];
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  maxLength?: number | undefined;
  multiline?: boolean | undefined;
  required?: boolean;
}
