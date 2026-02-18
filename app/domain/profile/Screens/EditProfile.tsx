import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../store/storeConfig';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { Picker } from '@react-native-picker/picker';
import { useFormik, FormikProvider } from 'formik';
import {
  updateProfileAction,
  getProfileAction,
} from '../store/async-actions/ProfileAsyncActions';
import { setToastMessage } from '../../../store/common-reducer/ToastReducer';
import Button from '../../../components/Button';
import InputText from '../../../components/inputText/InputText';
import { Colors } from '../../../constants/ColorConstants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FontType } from '../../../constants/FontType';
import DropdownComponent from '../../../components/dropdown/DropDown';

const FormField = ({ label, children }: any) => {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const profile = useAppSelector(
    (state: RootState) => state?.profile?.profileData,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      gender: profile?.gender || '',
      birthDate: profile?.birthDate || '',
      email: profile?.email || '',
      mobileNumber: profile?.mobileNumber || '',
      emergencyName: profile?.firstName || '',
      emergencyNumber: profile?.mobileNumber || '',
      address: {
        line1: profile?.address?.line1 || '',
        line2: profile?.address?.line2 || '',
        city: profile?.address?.city || '',
        state: profile?.address?.state || '',
        country: profile?.address?.country || '',
        zipcode: profile?.address?.zipcode || '',
      },
    },
    enableReinitialize: true,
    onSubmit: values => {
      const payload = {
        ...profile,
        uuid: profile?.uuid,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        birthDate: values.birthDate,
        email: values.email,
        mobileNumber: values.mobileNumber,
        emergencyContact: {
          name: values.emergencyName,
          phone: values.emergencyNumber,
        },
        address: values.address,
      };

      dispatch(updateProfileAction(payload))
        .unwrap()
        .then((res: any) => {
          if (res?.data || res?.status === 200 || res?.status === 201) {
            dispatch(
              setToastMessage({
                message: 'Profile updated successfully',
                type: 'success',
              }),
            );
            dispatch(getProfileAction());
            navigation.goBack();
          }
        })
        .catch((err: any) => {
          Alert.alert('Error', err?.message || 'Something went wrong');
        });
    },
  });

  return (
    <FormikProvider value={formik}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={22} color="#333" />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${profile?.nurseAvatar}` }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit-2" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionHeader}>Profile Details</Text>

            <InputText
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              label="First Name"
            />

            <InputText
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              label="Last Name"
            />

            
            <DropdownComponent
              label="Gender"
              selectedValue={formik.values.gender}
              search
              data={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
                { label: 'Other', value: 'OTHER' },
              ]}
              onValueChange={(value) =>
                formik.setFieldValue('gender', value)
              }
            />

            <FormField label="Date">
              <TouchableOpacity
                style={styles.inputRow}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>
                  {formik.values.birthDate
                    ? moment(formik.values.birthDate).format('DD/MM/YYYY')
                    : 'Select Date'}
                </Text>
                <Feather name="calendar" size={18} color="#777" />
              </TouchableOpacity>
            </FormField>

            <InputText
              label="Phone Number"
              value={formik.values.mobileNumber}
              onChangeText={formik.handleChange('mobileNumber')}
            />

            <InputText
              label="Email"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
            />

            <Text style={styles.sectionHeader}>Address</Text>

            <View style={styles.addressCard}>
              <InputText
                onChangeText={formik.handleChange('line1')}
                label="Line 1"
                value={formik.values.address.line1}
              />
              <InputText
                onChangeText={formik.handleChange('line2')}
                label="Line 2"
                value={formik.values.address.line2}
              />
              <InputText
                onChangeText={formik.handleChange('city')}
                label="city"
                value={formik.values.address.city}
              />
              <InputText
                onChangeText={formik.handleChange('state')}
                label="state"
                value={formik.values.address.state}
              />
              <InputText
                label="country"
                onChangeText={formik.handleChange('county')}
                value={formik.values.address.country}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.sectionHeader}>Emergency Details</Text>
            <InputText
              label="Name"
              value={formik.values.emergencyName}
              onChangeText={formik.handleChange('emergencyName')}
            />
            <InputText
              label="Phone Number"
              value={formik.values.emergencyNumber}
              onChangeText={formik.handleChange('emergencyNumber')}
            />
          </View>
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker
            value={
              formik.values.birthDate
                ? new Date(formik.values.birthDate)
                : new Date()
            }
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                formik.setFieldValue('birthDate', selectedDate.toISOString());
              }
            }}
          />
        )}

        <View style={styles.bottomContainer}>
          <Button text="Submit" onPress={formik.handleSubmit} />
        </View>
      </SafeAreaView>
    </FormikProvider>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  backButton: {
    marginLeft: 16,
    marginTop: 10,
  },

  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 140,
    backgroundColor: '#0E7490',
    padding: 8,
    borderRadius: 20,
  },

  formContainer: {
    paddingHorizontal: 20,
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    fontFamily: FontType.Roboto_Medium,
  },

  fieldWrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#7A7A7A',
    marginBottom: 6,
    fontFamily: FontType.Roboto_Medium,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderColor: Colors.neutral20,
    borderWidth: 1,
    fontFamily: FontType.Roboto_Medium,
  },

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

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  picker: {
    height: 50,
    width: '100%',
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryCode: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  phoneInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: FontType.Roboto_Medium,
  },

  addressCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  compactInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: FontType.Roboto_Medium,
  },

  readOnlyInput: {
    backgroundColor: '#F0F0F0',
    color: '#777',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  halfWidth: {
    width: '48%',
  },

  locationButton: {
    backgroundColor: '#EDEDED',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  locationText: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: FontType.Roboto_Medium,
  },

  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
  },

  nextButton: {
    backgroundColor: '#0E7490',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FontType.Roboto_Medium,
  },
});
