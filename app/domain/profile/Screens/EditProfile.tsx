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

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName || '',
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
      console.log("[Update Profile Button payload]", payload)

      dispatch(updateProfileAction(payload))
        .unwrap()
        .then((res: any) => {
          console.log("[Response after Succesful update profile]", res.status)
          if (res?.data || res?.status === 200 || res?.status === 201) {
            dispatch(
              setToastMessage({
                message: 'Profile updated successfully',
                type: 'success',
              }),
            );
            dispatch(getProfileAction())
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

            <FormField label="Name">
              <TextInput
                style={styles.input}
                value={formik.values.firstName}
                onChangeText={formik.handleChange('firstName')}
              />
            </FormField>

            <FormField label="Gender">
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formik.values.gender}
                  onValueChange={value =>
                    formik.setFieldValue('gender', value)
                  }
                  dropdownIconColor="#777"
                  style={styles.picker}
                >
                  <Picker.Item label="Male" value="MALE" />
                  <Picker.Item label="Female" value="FEMALE" />
                  <Picker.Item label="Other" value="OTHER" />
                </Picker>
              </View>
            </FormField>

            <FormField label="Date">
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={formik.values.birthDate}
                  onChangeText={formik.handleChange('birthDate')}
                />
                <Feather name="calendar" size={18} color="#777" />
              </View>
            </FormField>

            <FormField label="Phone Number">
              <View style={styles.phoneRow}>
                <View style={styles.countryCode}>
                  <Text>+33</Text>
                  <Feather name="chevron-down" size={16} />
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={formik.values.mobileNumber}
                  onChangeText={formik.handleChange('mobileNumber')}
                />
              </View>
            </FormField>

            <FormField label="Email">
              <TextInput
                style={styles.input}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
              />
            </FormField>

            <Text style={styles.sectionHeader}>Address</Text>

            <View style={styles.addressCard}>
              <FormField label="Line 1">
                <TextInput
                  style={[
                    styles.compactInput,
                    !isEditingAddress && styles.readOnlyInput,
                  ]}
                  value={formik.values.address.line1}
                  editable={isEditingAddress}
                  onChangeText={formik.handleChange('address.line1')}
                />
              </FormField>

              <FormField label="Line 2">
                <TextInput
                  style={[
                    styles.compactInput,
                    !isEditingAddress && styles.readOnlyInput,
                  ]}
                  value={formik.values.address.line2}
                  editable={isEditingAddress}
                  onChangeText={formik.handleChange('address.line2')}
                />
              </FormField>

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormField label="City">
                    <TextInput
                      style={[
                        styles.compactInput,
                        !isEditingAddress && styles.readOnlyInput,
                      ]}
                      value={formik.values.address.city}
                      editable={isEditingAddress}
                      onChangeText={formik.handleChange('address.city')}
                    />
                  </FormField>
                </View>

                <View style={styles.halfWidth}>
                  <FormField label="State">
                    <TextInput
                      style={[
                        styles.compactInput,
                        !isEditingAddress && styles.readOnlyInput,
                      ]}
                      value={formik.values.address.state}
                      editable={isEditingAddress}
                      onChangeText={formik.handleChange('address.state')}
                    />
                  </FormField>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormField label="Country">
                    <TextInput
                      style={[
                        styles.compactInput,
                        !isEditingAddress && styles.readOnlyInput,
                      ]}
                      value={formik.values.address.country}
                      editable={isEditingAddress}
                      onChangeText={formik.handleChange('address.country')}
                    />
                  </FormField>
                </View>

                <View style={styles.halfWidth}>
                  <FormField label="Zip">
                    <TextInput
                      style={[
                        styles.compactInput,
                        !isEditingAddress && styles.readOnlyInput,
                      ]}
                      value={formik.values.address.zipcode}
                      editable={isEditingAddress}
                      onChangeText={formik.handleChange('address.zipcode')}
                    />
                  </FormField>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => setIsEditingAddress(!isEditingAddress)}
            >
              <Text style={styles.locationText}>
                {isEditingAddress ? 'Submit' : 'Change Location'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionHeader}>Emergency Details</Text>

            <FormField label="Name">
              <TextInput
                style={styles.input}
                value={formik.values.emergencyName}
                onChangeText={formik.handleChange('emergencyName')}
              />
            </FormField>

            <FormField label="Phone Number">
              <View style={styles.phoneRow}>
                <View style={styles.countryCode}>
                  <Text>+33</Text>
                  <Feather name="chevron-down" size={16} />
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={formik.values.emergencyNumber}
                  onChangeText={formik.handleChange('emergencyNumber')}
                />
              </View>
            </FormField>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </FormikProvider>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
  },

  fieldWrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#7A7A7A',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },

  inputRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },

  bottomContainer: {
    padding: 16,
    backgroundColor: '#F4F4F4',
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
  },
});