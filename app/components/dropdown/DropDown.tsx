import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { DropdownStyles as styles } from './DropdownStyles';
import { Colors } from '../../constants/ColorConstants';

const DropdownComponent = ({
  style,
  label,
  data,
  search,
  maxHeight,
  placeholder,
  selectedValue,
  onValueChange,
  onKeyChange,
  onBlur,
  renderLeftIcon,
  disable,
  isValid,
  errorText,
  dropDownStyles,
  required,
  mode,
  activeColor,
  activeTextColor,
  placeholderStyle,
  selectedTextStyle,
  iconStyle,
}: DropdownComponentProps) => {
  const dropdowndata = [{ label: '', value: '' }];

  const [value, setValue] = useState('');

  const renderItem = (item: any) => {
    const isSelected = item.value === selectedValue;
    return (
      <View
        style={[
          styles.itemContainer,
          isSelected && activeColor && { backgroundColor: activeColor },
        ]}
      >
        <Text
          style={[
            styles.itemText,
            isSelected && activeTextColor && { color: activeTextColor },
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.labelStyles}>
          {label} {required && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
      )}
      <Dropdown
        style={[
          styles.dropdown,
          isValid && { borderColor: Colors.negative50, borderWidth: 0.5 },
          dropDownStyles,
          disable && { backgroundColor: Colors.neutral1 },
        ]}
        placeholderStyle={placeholderStyle || styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={iconStyle || styles.iconStyle}
        activeColor={activeColor}
        activeTextColor={activeTextColor}
        data={data ? data : dropdowndata}
        search={search}
        maxHeight={maxHeight ? maxHeight : 300}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : ''}
        searchPlaceholder="Search..."
        value={selectedValue ? selectedValue : null}
        onBlur={() => {
          if (onBlur) {
            onBlur(value);
          }
        }}
        onChange={(item: any) => {
          setValue(item.value);

          if (onValueChange) {
            onValueChange(item.value);
          }
          if (onKeyChange) {
            onKeyChange(item?.label);
          }
        }}
        renderLeftIcon={renderLeftIcon}
        disable={disable}
        mode={mode}
        containerStyle={{ maxHeight: '50%' }}
        renderItem={activeColor || activeTextColor ? renderItem : undefined}
      />
      {isValid && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default DropdownComponent;

interface DropdownComponentProps {
  style?: StyleProp<ViewStyle>;
  dropDownStyles?: StyleProp<ViewStyle>;
  label?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: any;
  iconStyle?: StyleProp<TextStyle>;
  data?: { label: string; value: string | number }[];
  search?: boolean;
  maxHeight?: number;
  labelField?: string;
  valueField?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string | null;
  onFocus?: () => void;
  onBlur?: (e: any) => void;
  // onChange?: (item: any) => void;
  renderLeftIcon?:
    | ((visible?: boolean | undefined) => JSX.Element | null | undefined)
    | undefined;
  selectedValue?: string;
  onValueChange?: (value: string | number) => void;
  onKeyChange?: any;
  disable?: boolean;
  isValid?: boolean;
  errorText?: string;
  required?: boolean;
  mode?: 'auto' | 'default' | 'modal' | undefined;
  activeColor?: string;
  activeTextColor?: string;
  containerStyle?: any;
}
