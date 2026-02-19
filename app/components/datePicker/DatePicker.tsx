import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Feather from '@react-native-vector-icons/feather';
import moment from 'moment';
import { Colors } from '../../constants/ColorConstants';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, setValue }: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString();
      setValue(formattedDate); // ✅ CALL FUNCTION
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {date
            ? moment(date).format('DD/MM/YYYY')
            : 'Select Date'}
        </Text>
        <Feather name="calendar" size={18} color="#777" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

interface Props {
  date?: string;
  setValue: (date: string) => void;
}

const styles = StyleSheet.create({
  inputRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral20,
  },
});
