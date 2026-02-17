import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../store/storeConfig';
import { useAppSelector } from '../../../store/hooks';
import { AppNavConstants } from '../../../contsants/NavConstants';

const ProfileScreen = () => {
  const profile = useAppSelector(
    (state: RootState) => state?.profile?.profileData,
  );

  useEffect(() => {
    console.log('[Profile SCreen] ', profile);
  }, []);

  const navigation = useNavigation<any>();
  return (
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
            source={{
              uri: `${profile.nurseAvatar}`,
            }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.detailsContainer}>
          <LabelValue
            label="Name"
            value={profile.firstName + ' ' + profile.lastName}
          />
          <LabelValue label="Email" value={profile.email} />
          <LabelValue label="Date" value={profile.birthDate} />
          <LabelValue label="Gender" value={profile.gender} />
          <LabelValue label="Phone Number" value={profile.mobileNumber} />
          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.addressCard}>
            <Text style={styles.addressLine}>
              {profile?.address?.line1}
              {profile?.address?.line2 ? `, ${profile?.address?.line2}` : ''}
            </Text>

            <Text style={styles.addressLine}>
              {profile?.address?.city},  {profile?.address?.state}{'  '}
              {profile?.address?.zipcode}
            </Text>

            <Text style={styles.addressLine}>{profile?.address?.country}</Text>
          </View>

          <Text style={styles.sectionTitle}>Emergency Details</Text>

          <LabelValue label="Name" value={profile.lastName} />
          <LabelValue label="Phone Number" value="(+33) 505 - 0124" />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppNavConstants.EDIT_PROFILE)}
          style={styles.editButton}
        >
          <Feather name="edit-2" size={18} color="#333" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const LabelValue = ({ label, value }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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

  detailsContainer: {
    paddingHorizontal: 20,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#7A7A7A',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E7490',
    marginTop: 10,
    marginBottom: 15,
  },

  bottomContainer: {
    padding: 16,
    backgroundColor: '#F4F4F4',
  },

  addressCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },

  addressLine: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
    paddingVertical: 14,
    borderRadius: 12,
  },

  editText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});
